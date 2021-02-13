import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ManagementClient} from 'auth0'
import middy from 'middy'
import {SQSEvent, SQSRecord} from 'aws-lambda'
import sqsBatch from '@middy/sqs-partial-batch-failure'
import sqsJsonBodyParser from '@middy/sqs-json-body-parser'
import {Octokit, RestEndpointMethodTypes} from '@octokit/rest'
import parseLinkHeader from 'parse-link-header'
import {concatLimit, mapLimit, retry} from 'async'
import {Page, Viewport} from 'puppeteer-core'
import AWS from 'aws-sdk'
import chromium from 'chrome-aws-lambda'

import {SetBodyToType} from '@api/lib/types'
import {QueueDTO} from '@nebula/types/queue'
import {logger} from '@nebula/log'
import {
  Poster,
  PosterImageSizes,
  PosterSteps,
  PosterWeek,
} from '@nebula/types/poster'
import {sendMessageToClient} from '@api/lib/websocket'
import {getWeekNumber, unixTimestampToDate} from '@api/lib/date'
import {indexOfMax} from '@nebula/common/array'
import {getRandomString} from '@api/lib/random'

import {InstagramPoster, OpenGraphPoster, HighQualityPoster} from './components'
import PosterModel from './poster.model'
import ConnectionModel from './connection.model'

const auth0Management = new ManagementClient({
  domain: process.env.IS_OFFLINE
    ? process.env.NEXT_PUBLIC_AUTH0_DOMAIN
    : process.env.AUTH0_DOMAIN,
  clientId: process.env.IS_OFFLINE
    ? process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    : process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users read:user_idp_tokens',
})

type Repositories = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data']

interface RepositoryStatistic {
  repository: string
  language: string
  weeks: {
    w?: string
    a?: number
    d?: number
    c?: number
  }[]
}

const S3 = new AWS.S3({
  ...(process.env.IS_OFFLINE && {
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:4569').href,
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
  }),
})

// TODO: Extract nested functions
export function startImplementation(event: SQSEvent) {
  logger.info(`Received records: ${JSON.stringify(event.Records)}`)
  const recordPromises = event.Records.map(async (record: any) => {
    const {
      body: {userId, years},
    } = record as SetBodyToType<SQSRecord, QueueDTO>

    const yearsToAnalyze = years.map(Number)

    try {
      await sendUpdateToClient(userId, PosterSteps.START)
      logger.info(`${userId} started step ${PosterSteps.START}`)

      const {identities} = await auth0Management.getUser({
        id: userId,
      })

      const githubToken = identities.find(
        identity => identity.provider === 'github',
      ).access_token

      await sendUpdateToClient(userId, PosterSteps.GATHERING)
      logger.info(`${userId} started step ${PosterSteps.GATHERING}`)

      const githubClient = new Octokit({
        auth: githubToken,
      })

      const {
        data: {
          name: githubName,
          login: githubLogin,
          followers: githubFollowers,
        },
      } = await githubClient.users.getAuthenticated()

      const posterData: Poster = {
        name: githubName ? githubName.trim() : githubLogin,
        followers: githubFollowers,
        year: yearsToAnalyze[0], // TODO: show all years if team decides on having multiple years
        dominantLanguage: '',
        dominantRepository: '',
        totalLinesOfCode: 0,
        weeks: [],
      }
      const {
        repositories: initialRepositories,
        totalPages,
      } = await getUserRepositoriesByPage(githubClient, 1, yearsToAnalyze)

      let repositories = [...initialRepositories]

      if (totalPages > 1) {
        const arr: Repositories = (await concatLimit(
          Array.from({length: totalPages - 1}, (_, i) => i + 2),
          10,
          async (page, callback) => {
            try {
              const {repositories} = await getUserRepositoriesByPage(
                githubClient,
                page,
                yearsToAnalyze,
              )

              if (!repositories) {
                return callback(new Error("couldn't get repositories"))
              }

              callback(null, repositories)
            } catch (e) {
              callback(new Error('Unexpected error ' + e))
            }
          },
        )) as any

        repositories = repositories.concat(arr)
      }

      logger.info(
        `Repositories are done! Analyzing ${repositories.length} repos`,
      )

      let repositoriesStats: RepositoryStatistic[] = await mapLimit(
        repositories,
        10,
        async ({name: repositoryName, owner, language}, callback) => {
          try {
            const repositoryStats: RestEndpointMethodTypes['repos']['getContributorsStats']['response'] = (await retry(
              {times: 20, interval: 6000},
              async retryCallback => {
                try {
                  const stats = await githubClient.repos.getContributorsStats({
                    owner: owner.login,
                    repo: repositoryName,
                  })

                  const IS_NOT_CACHED_STATUS_CODE = 202
                  if ((stats.status as number) === IS_NOT_CACHED_STATUS_CODE) {
                    logger.info(
                      `Repository (${repositoryName}) statistics cache data is not available. retrying.`,
                    )

                    return retryCallback(new Error('Retrying fetch'))
                  }

                  retryCallback(null, stats)
                } catch (e) {
                  retryCallback(new Error('Unexpected error ' + e))
                }
              },
            )) as any

            if (!Array.isArray(repositoryStats.data)) {
              return callback(null, undefined)
            }

            const userStats = repositoryStats.data.find(
              ({author}) => author.login === githubLogin,
            )

            if (!userStats) {
              return callback(null, undefined)
            }

            const payload: RepositoryStatistic = {
              repository: repositoryName,
              language,
              weeks: userStats.weeks,
            }

            callback(null, payload)
          } catch (e) {
            callback(new Error('Unexpected error ' + e))
          }
        },
      )

      repositoriesStats = repositoriesStats.filter(val => val !== undefined)

      logger.info(
        `Repository stats are done! result with filter: ${JSON.stringify(
          repositoriesStats,
        )}`,
      )

      await sendUpdateToClient(userId, PosterSteps.LAST_TOUCHES)
      logger.info(`${userId} started step ${PosterSteps.LAST_TOUCHES}`)

      const repositoryWeeklyTotal: Record<string, Record<string, number>> = {}
      const repositoryOverallTotal: Record<string, number> = {}
      const repositoryLanguages: Record<string, string> = {}
      const languageCount: Record<string, number> = {}

      const weeks: PosterWeek[] = new Array(52).fill(undefined)

      // Get general week activity
      await mapLimit(
        repositoriesStats,
        10,
        async ({weeks: repositoryWeeks, repository, language}, callback) => {
          try {
            await mapLimit(
              repositoryWeeks,
              3,
              async ({w, a: additions, d: deletions, c: commits}, callback) => {
                try {
                  const date = unixTimestampToDate(Number(w))

                  if (!yearsToAnalyze.includes(date.getFullYear())) {
                    return callback(null, '')
                  }

                  const weekNumber = getWeekNumber(date)
                  const weekIndex = weekNumber - 1
                  const lines = Math.abs(deletions) + additions
                  const total = lines + commits

                  if (!total) {
                    return callback(null, '')
                  }

                  posterData.totalLinesOfCode += total

                  if (!repositoryOverallTotal[repository]) {
                    repositoryOverallTotal[repository] = total
                  } else {
                    repositoryOverallTotal[repository] += total
                  }

                  if (!repositoryWeeklyTotal[weekIndex]) {
                    repositoryWeeklyTotal[weekIndex] = {}
                    repositoryWeeklyTotal[weekIndex][repository] = total
                  } else {
                    if (!repositoryWeeklyTotal[weekIndex][repository]) {
                      repositoryWeeklyTotal[weekIndex][repository] = total
                    } else {
                      repositoryWeeklyTotal[weekIndex][repository] += total
                    }
                  }

                  if (!repositoryLanguages[repository]) {
                    repositoryLanguages[repository] = language
                  }

                  if (!languageCount[language]) {
                    languageCount[language] = 1
                  } else {
                    languageCount[language] += 1
                  }

                  const currentWeek = weeks[weekIndex]

                  const currentWeekTotal = currentWeek?.total
                    ? currentWeek?.total + total
                    : total
                  const currentWeekCommits = currentWeek?.commits
                    ? currentWeek?.commits + commits
                    : commits
                  const currentWeekLines = currentWeek?.lines
                    ? currentWeek?.lines + lines
                    : lines

                  weeks[weekIndex] = {
                    week: weekNumber,
                    lines: currentWeekLines,
                    commits: currentWeekCommits,
                    total: currentWeekTotal,
                    dominantLanguage: '',
                    dominantRepository: '',
                  }

                  callback(null, '')
                } catch (e) {
                  callback(new Error('Unexpected error ' + e))
                }
              },
            )
            callback(null, '')
          } catch (e) {
            callback(new Error('Unexpected error ' + e))
          }
        },
      )

      // Get dominant language per week
      weeks.forEach((_, weekNumber) => {
        const currentWeek = weeks[weekNumber]

        if (!currentWeek) return

        const repositoriesActivities = repositoryWeeklyTotal[weekNumber]
        const indexOfMostDominantRepo = indexOfMax(
          Object.values(repositoriesActivities),
        )
        const dominantRepository = Object.keys(repositoriesActivities)[
          indexOfMostDominantRepo
        ]

        currentWeek.dominantLanguage = repositoryLanguages[dominantRepository]
        currentWeek.dominantRepository = dominantRepository
      })

      posterData.weeks = weeks.filter(val => val !== undefined)
      posterData.dominantRepository = Object.keys(repositoryOverallTotal)[
        indexOfMax(Object.values(repositoryOverallTotal))
      ]
      posterData.dominantLanguage = Object.keys(languageCount)[
        indexOfMax(Object.values(languageCount))
      ]

      const posterSlug = generatePosterSlug(githubLogin, yearsToAnalyze)

      logger.info(`Uploading pictures for ${userId}`)
      const fileNames = await generateImagesAndUploadToS3(
        posterData,
        posterSlug,
      )

      await PosterModel.update(
        {userId},
        {
          posterSlug,
          posterData: JSON.stringify(posterData),
          posterImages: fileNames,
        },
      )

      await sendUpdateToClient(userId, PosterSteps.READY, posterSlug)
      logger.info(`${userId} poster is ready!`)

      return {posterSlug, posterData}
    } catch (e) {
      logger.error(e)

      try {
        await PosterModel.update(
          {userId},
          {
            step: PosterSteps.FAILED,
          },
        )

        logger.info(`Marked poster as FAILED for user (${userId})`)
      } catch (err) {
        logger.error(
          `Error marking poster as FAILED for user (${userId}). Error details: ${err}`,
        )
      }

      return Promise.reject(e)
    }
  })

  return Promise.allSettled(recordPromises)
}

function generatePosterSlug(userName: string, yearsToAnalyze: number[]) {
  return `${userName.toLowerCase()}-poster-${
    yearsToAnalyze[0]
  }-${getRandomString()}`
}

async function getUserRepositoriesByPage(
  client: Octokit,
  page: number,
  yearsToAnalyze: number[],
) {
  logger.info(`Getting repository page ${page}`)

  const MAX_REPOSITORIES_PER_PAGE_ALLOWED = 100
  const result = await client.repos.listForAuthenticatedUser({
    visibility: 'public',
    sort: 'pushed',
    per_page: MAX_REPOSITORIES_PER_PAGE_ALLOWED,
    since: new Date(Math.min(...yearsToAnalyze), 0, 1).toISOString(),
    page,
  })

  const payload: {repositories: Repositories; totalPages: number} = {
    repositories: result.data,
    totalPages: 1,
  }

  if (result.headers.link) {
    const parsedPagination = parseLinkHeader(result.headers.link)
    payload.totalPages = Number(parsedPagination.last?.page)
  }

  if (
    Number(result.headers['x-ratelimit-limit']) <
    payload.totalPages * MAX_REPOSITORIES_PER_PAGE_ALLOWED
  ) {
    throw new Error(
      'Not enough rate limit left for User. Trying again in 15 minutes.',
    )
  }

  return payload
}

async function generateImagesAndUploadToS3(data: Poster, posterSlug: string) {
  const dimensions = {
    instagram: {
      width: 1080,
      height: 1080,
    },
    openGraph: {
      width: 1280,
      height: 680,
    },
    highQuality: {
      width: 1800,
      height: 2400,
      deviceScaleFactor: 3,
    },
  }
  const fileNames: PosterImageSizes = {
    instagram: '',
    openGraph: '',
    highQualityPoster: '',
  }

  logger.info('Starting browser...')
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()

  const instagramPosterFileName = await uploadScreenshot({
    page,
    html: ReactDOMServer.renderToString(<InstagramPoster data={data} />),
    viewport: dimensions.instagram,
    fileName: `${posterSlug}-1080x1080.png`,
    comment: 'Instagram poster',
  })

  fileNames.instagram = instagramPosterFileName

  const openGraphPosterFileName = await uploadScreenshot({
    page,
    html: ReactDOMServer.renderToString(<OpenGraphPoster data={data} />),
    viewport: dimensions.openGraph,
    fileName: `${posterSlug}-1280x680.png`,
    comment: 'Open Graph poster',
  })

  fileNames.openGraph = openGraphPosterFileName

  const highQualityPosterFileName = await uploadScreenshot({
    page,
    html: ReactDOMServer.renderToString(<HighQualityPoster data={data} />),
    viewport: dimensions.highQuality,
    fileName: `${posterSlug}-1800x2400.png`,
    comment: 'High quality poster',
  })

  fileNames.highQualityPoster = highQualityPosterFileName

  logger.info('Cleaning up browser...')
  await browser.close()

  return fileNames
}

async function uploadScreenshot({
  page,
  html,
  fileName,
  viewport,
  comment = '',
}: {
  page: Page
  html: string
  fileName: string
  comment?: string
  viewport: Viewport
}) {
  logger.info(`Setting page content for ${comment}...`)
  await page.setContent(html)
  await page.setViewport(viewport)

  logger.info(`Starting screenshot generation for ${comment}...`)
  const screenshot = await page.screenshot()

  logger.info(`Finished generating screenshot!`)

  logger.info(`Uploading screenshot to S3`)

  await S3.putObject({
    Bucket: process.env.POSTER_BUCKET,
    Key: fileName,
    Body: screenshot as any,
  }).promise()

  return fileName
}

async function sendUpdateToClient(
  userId: string,
  step: PosterSteps,
  posterSlug = '',
) {
  await PosterModel.update({userId}, {step})

  try {
    const websocketConnectionUrl = process.env.IS_OFFLINE
      ? 'http://localhost:3001'
      : process.env.WEBSOCKET_API_ENDPOINT

    const result = await ConnectionModel.query('userId')
      .eq(userId)
      .using('userIdIndex')
      .exec()

    if (result.length) {
      // Send update to all devices
      const clientsPromises = result.map(async ({connectionId}) =>
        sendMessageToClient(websocketConnectionUrl, connectionId, {
          step,
          posterSlug,
        }),
      )

      await Promise.all(clientsPromises)
    }
  } catch (error) {
    logger.error(error)
  }
}

const handler = middy(startImplementation)
  .use(sqsJsonBodyParser())
  .use(sqsBatch())

export {handler as start}