import { FieldValue } from 'firebase-admin/firestore'
import { filterKeywordRegistry, getNextLevelUpKeywordRegistry } from 'arccode-core'
import cloneDeep = require('lodash.clonedeep')

import type { User } from '~types'

import parseKeywordRegistry from './parseKeywordRegistry'

function processKeywordRegistry(user: User, keywordRegistryInput: unknown) {
  const keywordRegistry = parseKeywordRegistry(keywordRegistryInput)

  if (!keywordRegistry) return null

  const nextKeywordRegistry = cloneDeep(user.character.keywordRegistry)
  const userPayload: Record<string, any> = {}

  Object.entries(keywordRegistry).forEach(([language, keywordMap]) => {
    if (!language) return

    Object.entries(keywordMap).forEach(([keyword, amount]) => {
      if (!keyword) return
      if (amount !== amount) return

      const finalAmount = Math.floor(amount)

      if (!finalAmount) return

      userPayload[`character.keywordRegistry.${language}.${keyword}`] = FieldValue.increment(finalAmount)

      if (!nextKeywordRegistry[language]) nextKeywordRegistry[language] = {}
      if (!nextKeywordRegistry[language][keyword]) nextKeywordRegistry[language][keyword] = 0

      nextKeywordRegistry[language][keyword] += finalAmount
    })
  })

  if (!Object.keys(userPayload).length) return null

  userPayload['character.levelUpKeywordRegistry'] = filterKeywordRegistry(getNextLevelUpKeywordRegistry(user.character, nextKeywordRegistry))
  userPayload.updatedAt = new Date().toISOString()
  userPayload.nUpdates = FieldValue.increment(1)

  return userPayload
}

export default processKeywordRegistry
