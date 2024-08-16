import { FieldValue } from 'firebase-admin/firestore'
import { getLevelUpsKeywords } from 'arccode-core'

import type { User } from '~types'

import parseKeywords from './parseKeywords'

function processKeywords(user: User, keywordsBody: unknown) {
  const keywordsPayload = parseKeywords(keywordsBody)

  if (!keywordsPayload) return null

  const keywords = { ...user.character.keywords }
  const userPayload: Record<string, any> = {}

  Object.entries(keywordsPayload).forEach(([language, keywordMap]) => {
    if (!language) return

    Object.entries(keywordMap).forEach(([keyword, amount]) => {
      if (!keyword) return
      if (amount !== amount) return

      const finalAmount = Math.floor(amount)

      if (!finalAmount) return

      userPayload[`character.keywords.${language}.${keyword}`] = FieldValue.increment(finalAmount)

      if (!keywords[language]) keywords[language] = {}
      if (!keywords[language][keyword]) keywords[language][keyword] = 0

      keywords[language][keyword] += finalAmount
    })
  })

  if (!Object.keys(userPayload).length) return null

  const levelUpsKeywords = getLevelUpsKeywords(user.character, keywords)

  userPayload['character.levelUpsKeywords'] = levelUpsKeywords
  userPayload.updatedAt = FieldValue.serverTimestamp()
  userPayload.nUpdates = FieldValue.increment(1)

  return userPayload
}

export default processKeywords
