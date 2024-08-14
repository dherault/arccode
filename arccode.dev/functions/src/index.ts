// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { type DocumentReference, FieldValue, getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { z } from 'zod'

import type { User } from '~types'

import getLevelUps from '~logic/getLevelUps'

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

    let userDocument: DocumentReference
    let user: User | null = null

    try {
      const decodedIdToken = await getAuth(app).verifyIdToken(idToken)

      userDocument = getFirestore(app).collection('users').doc(decodedIdToken.uid)
      user = (await userDocument.get()).data() as User
    }
    catch (error) {
      logger.error('Invalid token', error)

      res.status(401).send('Unauthorized')

      return
    }

    if (!user) {
      res.status(401).send('Unauthorized')

      return
    }

    let keywordsPayload: Record<string, Record<string, number>>

    try {
      keywordsPayload = keywordRegistrySchema.parse(req.body.keywords)
    }
    catch (error) {
      logger.error('Invalid keywords', req.body.keywords, error)

      res.status(400).send('Invalid keywords')

      return
    }

    const keywords = { ...user.character.keywords }
    const userPayload: Record<string, any> = {}

    Object.entries(keywordsPayload).forEach(([language, keywordMap]) => {
      if (!language) return

      Object.entries(keywordMap).forEach(([keyword, amount]) => {
        if (!keyword) return
        if (amount !== amount) return

        const finalAmount = Math.round(amount)

        if (!finalAmount) return

        userPayload[`character.keywords.${language}.${keyword}`] = FieldValue.increment(finalAmount)

        if (!keywords[language]) keywords[language] = {}
        if (!keywords[language][keyword]) keywords[language][keyword] = 0

        keywords[language][keyword] += finalAmount
      })
    })

    if (!Object.keys(userPayload).length) return

    const { levelUps, levelUpsKeywords } = getLevelUps(user.character, keywords)

    userPayload.levelUps = levelUps
    userPayload.levelUpsKeywords = levelUpsKeywords
    userPayload.updatedAt = FieldValue.serverTimestamp()

    await userDocument.update(userPayload)

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
