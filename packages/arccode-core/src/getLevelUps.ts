import type { Character, KeywordRegistry } from './types'
import getCharacterKeywords from './getCharacterKeywords'

function getLevelUps(character: Character, nextKeywords?: KeywordRegistry) {
  let { levelUps = 0 } = character
  const beforeKeywords = getCharacterKeywords(character.processedKeywords ?? {})
  const keywords = getCharacterKeywords(nextKeywords ?? character.keywords ?? {})
  const levelUpsKeywords = { ...(character.levelUpsKeywords ?? {}) }

  keywords.forEach(keyword => {
    const beforeKeyword = beforeKeywords.find(beforeKeyword => beforeKeyword.language === keyword.language && beforeKeyword.name === keyword.name)

    if (!beforeKeyword) {
      if (!levelUpsKeywords[keyword.language]) levelUpsKeywords[keyword.language] = {}
      if (!levelUpsKeywords[keyword.language][keyword.name]) levelUpsKeywords[keyword.language][keyword.name] = 0

      const diff = keyword.level - levelUpsKeywords[keyword.language][keyword.name]

      levelUpsKeywords[keyword.language][keyword.name] += diff
      levelUps += diff

      return
    }

    if (keyword.level <= beforeKeyword.level) return
    if (!levelUpsKeywords[keyword.language]) levelUpsKeywords[keyword.language] = {}
    if (!levelUpsKeywords[keyword.language][keyword.name]) levelUpsKeywords[keyword.language][keyword.name] = 0

    const diff = keyword.level - beforeKeyword.level - levelUpsKeywords[keyword.language][keyword.name]

    levelUpsKeywords[keyword.language][keyword.name] += diff
    levelUps += diff
  })

  return {
    levelUps,
    levelUpsKeywords,
  }
}

export default getLevelUps
