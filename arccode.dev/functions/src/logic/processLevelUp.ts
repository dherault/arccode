import { FieldValue } from 'firebase-admin/firestore'

import type { User } from '~types'

import parseKeywords from './parseKeywords'
import pickRewardId from './pickRewardId'

function processLevelUp(user: User, levelUpsKeywords: unknown) {
  const levelUpsKeywordsPayload = parseKeywords(levelUpsKeywords)

  if (!levelUpsKeywordsPayload) return null

  let level = 0
  const userPayload: Record<string, any> = {}
  const unlockedItems: Record<string, number> = {}

  Object.entries(levelUpsKeywordsPayload).forEach(([language, keywordMap]) => {
    if (!language) return

    Object.entries(keywordMap).forEach(([keyword, amount]) => {
      if (!keyword) return

      const finalAmount = Math.floor(amount)

      if (finalAmount !== finalAmount) return
      if (finalAmount <= 0) return
      if ((user.character.levelUpsKeywords[language]?.[keyword] ?? 0) < finalAmount) return

      userPayload[`character.levelUpsKeywords.${language}.${keyword}`] = FieldValue.increment(-finalAmount)
      level += finalAmount

      for (let i = 0; i < finalAmount; i++) {
        const rewardItemId = pickRewardId()

        if (!unlockedItems[rewardItemId]) unlockedItems[rewardItemId] = 0

        unlockedItems[rewardItemId]++
      }
    })
  })

  if (level > 0) {
    userPayload['character.level'] = FieldValue.increment(level)
  }

  Object.entries(unlockedItems).forEach(([itemId, amount]) => {
    userPayload[`character.unlockedItems.${itemId}`] = FieldValue.increment(amount)
  })

  if (!Object.keys(userPayload).length) return null

  userPayload.updatedAt = FieldValue.serverTimestamp()
  userPayload.nUpdates = FieldValue.increment(1)

  return userPayload
}

export default processLevelUp
