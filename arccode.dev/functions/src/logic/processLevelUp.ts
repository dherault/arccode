import { FieldValue } from 'firebase-admin/firestore'

import type { User } from '~types'

import parseKeywordRegistry from './parseKeywordRegistry'
import pickRewardId from './pickRewardId'

function processLevelUp(user: User, levelUpKeywordRegistryInput: unknown) {
  const levelUpKeywordRegistry = parseKeywordRegistry(levelUpKeywordRegistryInput)

  if (!levelUpKeywordRegistry) return null

  let level = 0
  const userPayload: Record<string, any> = {}
  const unlockedItems: Record<string, number> = {}

  Object.entries(levelUpKeywordRegistry).forEach(([language, keywordMap]) => {
    if (!language) return

    Object.entries(keywordMap).forEach(([keyword, amount]) => {
      if (!keyword) return

      const finalAmount = Math.floor(amount)

      if (finalAmount !== finalAmount) return
      if (finalAmount <= 0) return

      const currentAmount = user.character.levelUpKeywordRegistry[language]?.[keyword] ?? 0

      if (currentAmount < finalAmount) return

      level += finalAmount
      userPayload[`character.levelUpKeywordRegistry.${language}.${keyword}`] = currentAmount === finalAmount
        ? FieldValue.delete()
        : FieldValue.increment(-finalAmount)

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

  userPayload.updatedAt = new Date().toISOString()
  userPayload.nUpdates = FieldValue.increment(1)

  return userPayload
}

export default processLevelUp
