import cloneDeep from 'lodash.clonedeep'

import type { Character, KeywordRegistry } from '../types'

import getKeywords from './getKeywords'

function getLevelUpsKeywords(character: Character, inputKeywords: KeywordRegistry) {
  const levelUpsKeywords = cloneDeep(character.levelUpsKeywords)
  const beforeKeywords = getKeywords(character.keywords)

  getKeywords(inputKeywords).forEach(keyword => {
    const beforeKeyword = beforeKeywords.find(beforeKeyword => beforeKeyword.language === keyword.language && beforeKeyword.name === keyword.name)

    if (!beforeKeyword) {
      if (!levelUpsKeywords[keyword.language]) levelUpsKeywords[keyword.language] = {}
      if (!levelUpsKeywords[keyword.language][keyword.name]) levelUpsKeywords[keyword.language][keyword.name] = 0

      const diff = keyword.level - levelUpsKeywords[keyword.language][keyword.name]

      levelUpsKeywords[keyword.language][keyword.name] += diff

      return
    }

    if (keyword.level <= beforeKeyword.level) return
    if (!levelUpsKeywords[keyword.language]) levelUpsKeywords[keyword.language] = {}
    if (!levelUpsKeywords[keyword.language][keyword.name]) levelUpsKeywords[keyword.language][keyword.name] = 0

    const diff = keyword.level - beforeKeyword.level - levelUpsKeywords[keyword.language][keyword.name]

    levelUpsKeywords[keyword.language][keyword.name] += diff
  })

  return levelUpsKeywords
}

export default getLevelUpsKeywords
