import type { Character, KeywordRegistry } from './types'
import getCharacterKeywords from './getCharacterKeywords'

function getLevelUps(character: Character, nextKeywords: KeywordRegistry | null) {
  let { levelUps } = character
  const beforeKeywords = getCharacterKeywords(character.processedKeywords)
  const keywords = getCharacterKeywords(nextKeywords ?? character.keywords)
  const levelUpsKeywords = { ...character.levelUpsKeywords }

  keywords.forEach(keyword => {
    const beforeKeyword = beforeKeywords.find(beforeKeyword => beforeKeyword.language === keyword.language && beforeKeyword.name === keyword.name)

    if (!beforeKeyword) {
      levelUps += keyword.level

      if (!levelUpsKeywords[keyword.language]) levelUpsKeywords[keyword.language] = {}
      if (!levelUpsKeywords[keyword.language][keyword.name]) levelUpsKeywords[keyword.language][keyword.name] = 0

      levelUpsKeywords[keyword.language][keyword.name] += keyword.level

      return
    }

    if (keyword.level <= beforeKeyword.level) return

    const diff = keyword.level - beforeKeyword.level

    levelUps += diff

    if (!levelUpsKeywords[keyword.language]) levelUpsKeywords[keyword.language] = {}
    if (!levelUpsKeywords[keyword.language][keyword.name]) levelUpsKeywords[keyword.language][keyword.name] = 0

    levelUpsKeywords[keyword.language][keyword.name] += diff

  })

  return {
    levelUps,
    levelUpsKeywords,
  }
}

export default getLevelUps
