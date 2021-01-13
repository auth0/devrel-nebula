import {APIGatewayEvent} from 'aws-lambda'

import {DeathStarUserStatus} from '@nebula/types/death-star'

import DeathStar from './death-star.model'

async function disconnect(event: APIGatewayEvent) {
  const result = await DeathStar.query('connectionId')
    .eq(event.requestContext.connectionId)
    .using('connectionIdIndex')
    .exec()

  if (result) {
    await DeathStar.update(
      {userId: result[0].userId},
      {
        connectionId: undefined,
        connectionStatus: DeathStarUserStatus.OFFLINE,
      },
    )
  }
}

export default disconnect
