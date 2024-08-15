import { logger } from 'firebase-functions'
import { getAuth } from 'firebase-admin/auth'
import type { Request } from 'firebase-functions'

import type { User } from '~types'

import app, { firestore } from './firebase'

const nullValue = {
  user: null,
  userDocument: null,
}

async function getUser(request: Request) {
  const idToken = request.headers.authorization?.split('Bearer ')[1]

  if (!idToken) return nullValue

  try {
    const decodedIdToken = await getAuth(app).verifyIdToken(idToken)
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

export default getUser
