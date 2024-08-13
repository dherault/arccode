// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { z } from 'zod'

const app = initializeApp()

const keywordRegistrySchema = z.object({}).catchall(z.object({}).catchall(z.number().nonnegative().finite()))

export const registerKeywords = onRequest(
  { cors: true },
  async (req, res) => {

    const idToken = req.headers.authorization?.split('Bearer ')[1]

    if (!idToken) {
      res.status(401).send('Unauthorized')

      return
    }

    let userId: string

    try {
      const decodedIdToken = await getAuth(app).verifyIdToken(idToken)

      userId = decodedIdToken.uid
    }
    catch (error) {
      logger.error('Invalid token', error)

      res.status(401).send('Unauthorized')

      return
    }

    let keywords: Record<string, Record<string, number>>

    try {
      keywords = keywordRegistrySchema.parse(req.body.keywords)
    }
    catch (error) {
      logger.error('Invalid keywords', req.body.keywords, error)

      res.status(400).send('Invalid keywords')

      return
    }

    const payload: Record<string, any> = {
      updatedAt: FieldValue.serverTimestamp(),
    }

    Object.entries(keywords).forEach(([language, keywordMap]) => {
      if (!language) return

      Object.entries(keywordMap).forEach(([keyword, amount]) => {
        if (!keyword) return
        if (amount !== amount) return

        payload[`character.keywords.${language}.${keyword}`] = FieldValue.increment(Math.round(amount))
      })
    })

    await getFirestore(app)
    .collection('users')
    .doc(userId)
    .update(payload)

    res.status(200).send()
  }
)

export const activateVscodeExtension = onRequest(
  { cors: true },
  async (req, res) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]

    if (!idToken) {
      res.status(401).send('Unauthorized')

      return
    }

    let userId: string

    try {
      const decodedIdToken = await getAuth(app).verifyIdToken(idToken)

      userId = decodedIdToken.uid
    }
    catch (error) {
      logger.error('Invalid token', error)

      res.status(401).send('Unauthorized')

      return
    }

    const payload: Record<string, any> = {
      hasConnectedExtension: true,
      updatedAt: FieldValue.serverTimestamp(),
    }

    await getFirestore(app)
    .collection('users')
    .doc(userId)
    .update(payload)

    logger.info('Activated extension for user', userId)

    res.status(200).send()
  }
)
