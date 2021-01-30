import dynamic from 'next/dynamic'

import {LayoutNoBackdrop, GetPoster} from '@components/poster'
import {PosterService} from '@lib/poster/poster-service'
import {Poster} from '@nebula/types/poster'
import {logger} from '@nebula/log'

const Star = dynamic(() => import('@components/poster/Star'), {ssr: false})

interface PosterBySlugProps {
  posterData: Poster
}

export default function PosterBySlug({posterData}: PosterBySlugProps) {
  return (
    <section className="flex flex-1 flex-col items-center pb-12 px-4 overflow-hidden">
      <Star wrapperClassName="mt-12" data={posterData} />
      {/* <GetPoster /> */}
    </section>
  )
}

export async function getServerSideProps({params, res}) {
  try {
    const {slug} = params

    const {posterData} = await PosterService.getPosterBySlug(slug)

    return {
      props: {
        posterData: JSON.parse(posterData) as Poster,
      },
    }
  } catch (err) {
    logger.error(err)

    const e = err.message.split(' ')
    const errorStatus: string = e[e.length - 1]

    if (errorStatus === '404') {
      res.writeHead(302, {
        Location: `/`,
      })

      res.end()

      return {props: {}}
    }
  }
}

PosterBySlug.Layout = LayoutNoBackdrop