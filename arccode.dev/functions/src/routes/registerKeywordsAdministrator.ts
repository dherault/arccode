import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions/v1'

import type { User } from '~types'

import { firestore } from '../firebase'
import { getUserFromCallableRequest } from '../authentication/getUser'
import processKeywords from '../logic/processKeywords'

const registerKeywordsAdministrator = onCall(async request => {
  const { user: administratorUser } = await getUserFromCallableRequest(request)

  if (!administratorUser) throw new HttpsError('permission-denied', 'You are not authenticated')
  if (!administratorUser.isAdministrator) throw new HttpsError('permission-denied', 'You are not an administrator')

  const { keywords, userId } = request.data

  if (!userId) {
    logger.log('Missing userId')

    throw new HttpsError('invalid-argument', 'You must provide a value "userId" field')
  }

  logger.log(`Updating keywords from ${administratorUser.id} for ${userId}`)

  const userDocument = firestore.collection('users').doc(userId)
  const user = (await userDocument.get()).data() as User

  const userPayload = processKeywords(user, keywords)

  if (!userPayload) throw new HttpsError('invalid-argument', 'You must provide a valid "keywords" field')

  await userDocument.update(userPayload)

  return {
    message: 'ok',
  }
})

export default registerKeywordsAdministrator
