import { HttpsError, onCall, onRequest } from 'firebase-functions/v2/https'
import { FieldValue } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions/v1'

import type { User } from '~types'

import { firestore } from './firebase'
import { getUserFromCallableRequest, getUserFromRequest } from './authentication/getUser'
import processKeywords from './logic/processKeywords'
import processLevelUp from './logic/processLevelUp'

// Routes with onRequest andn cors are called from the extension
const COSR = { cors: true }

export const registerKeywords = onRequest(COSR, async (request, response) => {
  const { user, userDocument } = await getUserFromRequest(request)

  if (!(user && userDocument)) {
    response.status(401).send()

    return
  }

  logger.log(`Updating keywords for ${user.id}`)

  const userPayload = processKeywords(user, request.body.keywords)

  if (!userPayload) {
    response.status(400).send()

    return
  }

  await userDocument.update(userPayload)

  response.status(200).send()
})

export const registerKeywordsAdministrator = onCall(async request => {
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

  const userPayload = await processKeywords(user, keywords)

  if (!userPayload) throw new HttpsError('invalid-argument', 'You must provide a valid "keywords" field')

  await userDocument.update(userPayload)

  return {
    message: 'ok',
  }
})

export const levelUp = onCall(async request => {
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

export const activateVscodeExtension = onRequest(COSR, async (request, response) => {
  const { user, userDocument } = await getUserFromRequest(request)

  if (!(user && userDocument)) {
    response.status(401).send()

    return
  }

  logger.log(`Activating extension for ${user.id}`)

  const payload: Record<string, any> = {
    hasConnectedExtension: true,
    updatedAt: FieldValue.serverTimestamp(),
    nUpdates: FieldValue.increment(1),
  }

  await userDocument.update(payload)

  response.status(200).send()
})
