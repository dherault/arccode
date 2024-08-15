import { FieldValue } from 'firebase-admin/firestore'

import type { User } from '~types'

import parseKeywords from './parseKeywords'
import pickReward from './pickReward'

function processLevelUp(user: User, levelUpsKeywords: unknown) {
  const levelUpsKeywordsPayload = parseKeywords(levelUpsKeywords)

  if (!levelUpsKeywordsPayload) return null

  const userPayload: Record<string, any> = {}
  const unlockedItems: Record<string, number> = {}

  Object.entries(levelUpsKeywordsPayload).forEach(([language, keywordMap]) => {
    if (!language) return

    Object.entries(keywordMap).forEach(([keyword, amount]) => {
      if (!keyword) return
      if (amount !== amount) return

      const finalAmount = Math.round(amount)

      if (finalAmount <= 0) return
      if ((user.character.levelUpsKeywords[language]?.[keyword] ?? 0) < finalAmount) return

      userPayload[`character.levelUpsKeywords.${language}.${keyword}`] = FieldValue.increment(-finalAmount)

      for (let i = 0; i < finalAmount; i++) {
        const rewardItem = pickReward()

        if (!unlockedItems[rewardItem.id]) unlockedItems[rewardItem.id] = 0

        unlockedItems[rewardItem.id]++
      }
    })
  })

  Object.entries(unlockedItems).forEach(([itemId, amount]) => {
    userPayload[`character.unlockedItems.${itemId}`] = FieldValue.increment(amount)
  })

  if (!Object.keys(userPayload).length) return null

  userPayload.updatedAt = FieldValue.serverTimestamp()

  return userPayload
}

export default processLevelUp
