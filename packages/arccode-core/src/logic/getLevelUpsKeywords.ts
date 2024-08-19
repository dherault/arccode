import cloneDeep from 'lodash.clonedeep'

import type { Character, KeywordRegistry } from '../types'

import getKeywords from './getKeywords'

function getLevelUpsKeywords(character: Character, inputKeywordRegistry: KeywordRegistry) {
  const levelUpsKeywordRegistry = cloneDeep(character.levelUpsKeywordRegistry)
  const previousKeywords = getKeywords(character.keywordRegistry)

  getKeywords(inputKeywordRegistry).forEach(keyword => {
    const previousKeyword = previousKeywords.find(beforeKeyword => beforeKeyword.language === keyword.language && beforeKeyword.name === keyword.name)

    if (!previousKeyword) {
      if (!levelUpsKeywordRegistry[keyword.language]) levelUpsKeywordRegistry[keyword.language] = {}
      if (!levelUpsKeywordRegistry[keyword.language][keyword.name]) levelUpsKeywordRegistry[keyword.language][keyword.name] = 0

      const diff = keyword.level - levelUpsKeywordRegistry[keyword.language][keyword.name]

      levelUpsKeywordRegistry[keyword.language][keyword.name] += diff

      return
    }

    if (keyword.level <= previousKeyword.level) return
    if (!levelUpsKeywordRegistry[keyword.language]) levelUpsKeywordRegistry[keyword.language] = {}
    if (!levelUpsKeywordRegistry[keyword.language][keyword.name]) levelUpsKeywordRegistry[keyword.language][keyword.name] = 0

    const diff = keyword.level - previousKeyword.level - levelUpsKeywordRegistry[keyword.language][keyword.name]

    levelUpsKeywordRegistry[keyword.language][keyword.name] += diff
  })

  return levelUpsKeywordRegistry
}

export default getLevelUpsKeywords
