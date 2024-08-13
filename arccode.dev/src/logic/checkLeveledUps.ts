import type { Character } from '~types'

import getCharacterKeywords from '~logic/getCharacterKeywords'

function checkHasLeveledUp(character: Character) {
  console.log('character', character)
  let levelUps = 0
  const beforeKeywords = getCharacterKeywords(character.processedKeywords)
  const keywords = getCharacterKeywords(character.keywords)

  keywords.forEach(keyword => {
    const beforeKeyword = beforeKeywords.find(beforeKeyword => beforeKeyword.language === keyword.language && beforeKeyword.name === keyword.name)

    if (!beforeKeyword) {
      levelUps += keyword.level

      return
    }

    if (keyword.level > beforeKeyword.level) {
      levelUps += keyword.level - beforeKeyword.level
    }
  })

  return levelUps
}

export default checkHasLeveledUp
