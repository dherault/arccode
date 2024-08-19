import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions/v1'

import { getUserFromCallableRequest } from '../authentication/getUser'
import processLevelUp from '../logic/processLevelUp'

const levelUp = onCall(async request => {
  const { user, userDocument } = await getUserFromCallableRequest(request)

  if (!(user && userDocument)) throw new HttpsError('permission-denied', 'You are not authenticated')

  logger.log(`Level up for ${user.id}`)

  const userPayload = processLevelUp(user, request.data.levelUpsKeywords)

  if (!userPayload) throw new HttpsError('invalid-argument', 'You must provide a valid "levelUpsKeywords" field')

  await userDocument.update(userPayload)

  return {
    message: 'ok',
  }
})

export default levelUp
