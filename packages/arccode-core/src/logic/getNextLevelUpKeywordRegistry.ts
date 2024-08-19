import cloneDeep from 'lodash.clonedeep'

import type { Character, KeywordRegistry } from '../types'

import getKeywords from './getKeywords'

function getNextLevelUpKeywordRegistry(character: Character, inputKeywordRegistry: KeywordRegistry) {
  const levelUpKeywordRegistry = cloneDeep(character.levelUpKeywordRegistry)
  const previousKeywords = getKeywords(character.keywordRegistry)

  getKeywords(inputKeywordRegistry).forEach(keyword => {
    const previousKeyword = previousKeywords.find(beforeKeyword => beforeKeyword.language === keyword.language && beforeKeyword.name === keyword.name)

    if (!previousKeyword) {
      if (!levelUpKeywordRegistry[keyword.language]) levelUpKeywordRegistry[keyword.language] = {}
      if (!levelUpKeywordRegistry[keyword.language][keyword.name]) levelUpKeywordRegistry[keyword.language][keyword.name] = 0

      const diff = keyword.level - levelUpKeywordRegistry[keyword.language][keyword.name]

      levelUpKeywordRegistry[keyword.language][keyword.name] += diff

      return
    }

    if (keyword.level <= previousKeyword.level) return
    if (!levelUpKeywordRegistry[keyword.language]) levelUpKeywordRegistry[keyword.language] = {}
    if (!levelUpKeywordRegistry[keyword.language][keyword.name]) levelUpKeywordRegistry[keyword.language][keyword.name] = 0

    const diff = keyword.level - previousKeyword.level - levelUpKeywordRegistry[keyword.language][keyword.name]

    levelUpKeywordRegistry[keyword.language][keyword.name] += diff
  })

  return levelUpKeywordRegistry
}

export default getNextLevelUpKeywordRegistry
