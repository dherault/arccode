import { type DocumentReference, FieldValue } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions'
import { z } from 'zod'
import { getLevelUps } from 'arccode-core'

import type { KeywordRegistry, User } from '~types'

const keywordRegistrySchema = z.object({}).catchall(z.object({}).catchall(z.number().nonnegative().finite()))

async function updateKeywords(
  user: User,
  userDocument: DocumentReference,
  keywordsBody: any,
) {
  let keywordsPayload: KeywordRegistry

  try {
    keywordsPayload = keywordRegistrySchema.parse(keywordsBody)
  }
  catch (error) {
    logger.error('Invalid keywords', keywordsBody, error)

    return false
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

  return true
}

export default updateKeywords
