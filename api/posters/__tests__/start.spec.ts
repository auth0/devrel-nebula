import {ManagementClient} from 'auth0'

import {rest, server, githubURLs} from '@api/tests/mock-server'
import {
  buildAuthenticatedGitHubUser,
  buildContributorStats,
  buildGitHubRepo,
} from '@api/tests/generate'

import {startImplementation as start} from '../start'

jest.mock('auth0')

const mockedManagementClient = ManagementClient as jest.MockedClass<
  typeof ManagementClient
>

it.only('should generate user activity', async () => {
  const user = buildAuthenticatedGitHubUser()
  const repos = Array.from({length: 5}, () => buildGitHubRepo())
  const contributions = new Array(5).fill(buildContributorStats())

  server.use(
    rest.get(githubURLs.user.getAuthenticated, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(user))
    }),
    rest.get(
      githubURLs.repos.listForAuthenticatedUser,
      async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(repos))
      },
    ),
    rest.get(githubURLs.repos.getContributions, async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(contributions))
    }),
  )

  const userId = 'MOCK_USER_ID'

  const event: any = {
    Records: [
      {
        body: {
          userId,
        },
      },
    ],
  }

  mockedManagementClient.prototype.getUser = jest.fn().mockResolvedValueOnce({
    identities: [{provider: 'github', access_token: undefined}],
  })

  const results = await start(event)
  const result = results[0].status === 'fulfilled' && results[0].value

  expect(result.posterSlug).toContain(`${user.name.toLowerCase()}-poster-2020`)
  expect(result.posterData).toEqual({
    name: user.name,
    followers: user.followers,
    year: 2020,
    dominantLanguage: repos[0].language,
    dominantRepository: repos[0].name,
    totalLinesOfCode: 5025,
    weeks: [
      {
        week: 15,
        lines: 445,
        commits: 10,
        total: 455,
        dominantLanguage: repos[0].language,
        dominantRepository: repos[0].name,
      },
      {
        week: 28,
        lines: 635,
        commits: 30,
        total: 665,
        dominantLanguage: repos[0].language,
        dominantRepository: repos[0].name,
      },
      {
        week: 32,
        lines: 3885,
        commits: 20,
        total: 3905,
        dominantLanguage: repos[0].language,
        dominantRepository: repos[0].name,
      },
    ],
  })
})
