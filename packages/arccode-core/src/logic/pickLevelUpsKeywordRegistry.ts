import cloneDeep from 'lodash.clonedeep'

import type { Character, KeywordRegistry } from '../types'

function pickLevelUpsKeywordRegistry(character: Character, n: number) {
  const nextLevelUpsKeywordRegistry: KeywordRegistry = {}
  const currentLevelUpsKeywordRegistry = cloneDeep(character.levelUpsKeywordRegistry)

  for (let i = 0; i < n; i++) {
    const firstLanguage = Object.keys(currentLevelUpsKeywordRegistry)[0]

    if (!firstLanguage) break

    const firstKeyword = Object.keys(currentLevelUpsKeywordRegistry[firstLanguage])[0]

    if (!firstKeyword) {
      delete currentLevelUpsKeywordRegistry[firstLanguage]
      i--

      continue
    }

    if (currentLevelUpsKeywordRegistry[firstLanguage][firstKeyword] <= 0) {
      delete currentLevelUpsKeywordRegistry[firstLanguage][firstKeyword]
      i--

      continue
    }

    if (!nextLevelUpsKeywordRegistry[firstLanguage]) nextLevelUpsKeywordRegistry[firstLanguage] = {}
    if (!nextLevelUpsKeywordRegistry[firstLanguage][firstKeyword]) nextLevelUpsKeywordRegistry[firstLanguage][firstKeyword] = 0

    currentLevelUpsKeywordRegistry[firstLanguage][firstKeyword]--
    nextLevelUpsKeywordRegistry[firstLanguage][firstKeyword]++
  }

  return nextLevelUpsKeywordRegistry
}

export default pickLevelUpsKeywordRegistry
