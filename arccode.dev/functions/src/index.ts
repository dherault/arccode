import { onRequest } from 'firebase-functions/v2/https'
import { FieldValue } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions/v1'

import type { User } from '~types'

import updateKeywords from './updateKeywords'
import getUser from './getUser'
import { firestore } from './firebase'

export const registerKeywords = onRequest(
  { cors: true },
  async (request, response) => {
    const { user, userDocument } = await getUser(request)

    if (!(user && userDocument)) {
      response.status(401).send()

      return
    }

    const success = await updateKeywords(
      user,
      userDocument,
      request.body.keywords,
    )

    if (!success) {
      response.status(400).send()

      return
    }

    response.status(200).send()
  }
)

export const registerKeywordsAdministrator = onRequest(
  { cors: true },
  async (request, response) => {
    const { user: administratorUser } = await getUser(request)

    if (!administratorUser) {
      response.status(401).send()

      return
    }

    if (!administratorUser.isAdministrator) {
      response.status(403).send()

      return
    }

    const { keywords, userId } = request.body.data

    if (!userId) {
      logger.log('Missing userId')

      response.status(400).send()

      return
    }

    logger.log('keywords')
    logger.log(keywords)

    const userDocument = firestore.collection('users').doc(userId)
    const user = (await userDocument.get()).data() as User

    const success = await updateKeywords(
      user,
      userDocument,
      keywords,
    )

    response.status(success ? 200 : 400).send({
      data: {
        message: 'ok',
      },
    })
  }
)

export const activateVscodeExtension = onRequest(
  { cors: true },
  async (request, response) => {
    const { user, userDocument } = await getUser(request)

    if (!(user && userDocument)) {
      response.status(401).send('Unauthorized')

      return
    }

    const payload: Record<string, any> = {
      hasConnectedExtension: true,
      updatedAt: FieldValue.serverTimestamp(),
    }

    await userDocument.update(payload)

    response.status(200).send()
  }
)
