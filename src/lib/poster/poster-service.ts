import axios from 'axios'

import {client} from '@lib/api'
import {constants} from '@lib/common'
import {
  PosterGalleryResponse,
  PosterSlugResponse,
  PosterStatusDTO,
  PosterStatusResponse,
} from '@nebula/types/poster'
import {QueueDTO, QueueResponse} from '@nebula/types/queue'

class PosterServiceImplementation {
  public async queuePoster({year}: {year: QueueDTO['year']}) {
    const {data} = await client.post<QueueResponse>('/posters/queue', {
      year,
    })

    return data
  }

  public async _getPosters(
    userId: PosterStatusDTO['userId'],
    accessToken: string,
  ) {
    const url = `${constants.api.lambdaUrl}/users/${userId}/posters`

    const {data} = await axios.get<PosterStatusResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return data
  }

  public async _getPosterBySlug(posterSlug: string) {
    const url = `${constants.api.lambdaUrl}/posters/${posterSlug}`

    const {data} = await axios.get<PosterSlugResponse>(url)

    return data
  }

  public async _getGalleryPosters() {
    const url = `${constants.api.lambdaUrl}/posters/gallery`

    const {data} = await axios.get<PosterGalleryResponse>(url)

    return data
  }

  public async _requestQueue(
    userId: string,
    username: string,
    year: QueueDTO['year'],
    accessToken: string,
  ) {
    const url = `${constants.api.lambdaUrl}/users/${userId}/posters/queue`

    return axios.post<QueueResponse>(
      url,
      {username, year},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }
}

export const PosterService = new PosterServiceImplementation()
