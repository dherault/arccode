import type { Character, KeywordRegistry } from '~types'

import getCharacterKeywords from '~logic/getCharacterKeywords'

function getLevelUps(character: Character) {
  let nLevelUps = 0
  const beforeKeywords = getCharacterKeywords(character.processedKeywords)
  const keywords = getCharacterKeywords(character.keywords)
  const affectedKeywords: KeywordRegistry = {}

  keywords.forEach(keyword => {
    const beforeKeyword = beforeKeywords.find(beforeKeyword => beforeKeyword.language === keyword.language && beforeKeyword.name === keyword.name)

    if (!beforeKeyword) {
      nLevelUps += keyword.level

      if (!affectedKeywords[keyword.language]) affectedKeywords[keyword.language] = {}
      if (!affectedKeywords[keyword.language][keyword.name]) affectedKeywords[keyword.language][keyword.name] = 0

      affectedKeywords[keyword.language][keyword.name] += keyword.level

      return
    }

    if (keyword.level <= beforeKeyword.level) return

    const diff = keyword.level - beforeKeyword.level

    nLevelUps += diff

    if (!affectedKeywords[keyword.language]) affectedKeywords[keyword.language] = {}
    if (!affectedKeywords[keyword.language][keyword.name]) affectedKeywords[keyword.language][keyword.name] = 0

    affectedKeywords[keyword.language][keyword.name] += diff

  })

  return {
    count: nLevelUps,
    keywords: affectedKeywords,
  }
}

export default getLevelUps
