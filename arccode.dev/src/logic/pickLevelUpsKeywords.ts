import cloneDeep from 'lodash.clonedeep'

import type { Character, KeywordRegistry } from '~types'

function pickLevelUpsKeywords(character: Character, n: number) {
  const nextLevelUpsKeywords: KeywordRegistry = {}
  const currentLevelUpsKeywords = cloneDeep(character.levelUpsKeywords)

  for (let i = 0; i < n; i++) {
    const firstLanguage = Object.keys(currentLevelUpsKeywords)[0]

    if (!firstLanguage) break

    const firstKeyword = Object.keys(currentLevelUpsKeywords[firstLanguage])[0]

    if (!firstKeyword) {
      delete currentLevelUpsKeywords[firstLanguage]
      i--

      continue
    }

    if (currentLevelUpsKeywords[firstLanguage][firstKeyword] <= 0) {
      delete currentLevelUpsKeywords[firstLanguage][firstKeyword]
      i--

      continue
    }

    if (!nextLevelUpsKeywords[firstLanguage]) nextLevelUpsKeywords[firstLanguage] = {}
    if (!nextLevelUpsKeywords[firstLanguage][firstKeyword]) nextLevelUpsKeywords[firstLanguage][firstKeyword] = 0

    currentLevelUpsKeywords[firstLanguage][firstKeyword]--
    nextLevelUpsKeywords[firstLanguage][firstKeyword]++
  }

  return nextLevelUpsKeywords
}

export default pickLevelUpsKeywords
