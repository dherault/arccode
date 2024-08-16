import { logger } from 'firebase-functions'
import type { Request } from 'firebase-functions'
import type { CallableRequest } from 'firebase-functions/v2/https'

import type { User } from '~types'

import { auth, firestore } from '../firebase'

const nullValue = {
  user: null,
  userDocument: null,
}

export async function getUserFromRequest(request: Request) {
  const idToken = request.headers.authorization?.split('Bearer ')[1]

  if (!idToken) return nullValue

  try {
    const decodedIdToken = await auth.verifyIdToken(idToken)
    const userDocument = firestore.collection('users').doc(decodedIdToken.uid)
    const user = (await userDocument.get()).data() as User

    return {
      user,
      userDocument,
    }
  }
  catch (error) {
    logger.error('Invalid token', error)

    return nullValue
  }
}

export async function getUserFromCallableRequest(request: CallableRequest) {
  if (!request.auth?.uid) return nullValue

  const userDocument = firestore.collection('users').doc(request.auth.uid)
  const user = (await userDocument.get()).data() as User

  return {
    user,
    userDocument,
  }
}
