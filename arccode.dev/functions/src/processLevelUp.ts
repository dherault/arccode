import { FieldValue } from 'firebase-admin/firestore'

import type { User } from '~types'

import getKeywordPayload from './getKeywordPayload'

function processLevelUp(user: User, levelUpsKeywords: unknown) {
  const keywordsPayload = getKeywordPayload(levelUpsKeywords)

  if (!keywordsPayload) return null

  const userPayload: Record<string, any> = {}

  Object.entries(keywordsPayload).forEach(([language, keywordMap]) => {
    if (!language) return

    Object.entries(keywordMap).forEach(([keyword, amount]) => {
      if (!keyword) return
      if (amount !== amount) return

      const finalAmount = Math.round(amount)

      if (!finalAmount) return

      console.log('finalAmount', finalAmount)
      // userPayload[`character.keywords.${language}.${keyword}`] = FieldValue.increment(finalAmount)

      // if (!keywords[language]) keywords[language] = {}
      // if (!keywords[language][keyword]) keywords[language][keyword] = 0

      // keywords[language][keyword] += finalAmount
    })
  })

  userPayload.updatedAt = FieldValue.serverTimestamp()

  return userPayload
}

export default processLevelUp
