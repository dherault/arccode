import cloneDeep from 'lodash.clonedeep'

import type { Character, KeywordRegistry } from '../types'

function pickLevelUpKeywordRegistry(character: Character, n: number) {
  const nextLevelUpKeywordRegistry: KeywordRegistry = {}
  const currentLevelUpKeywordRegistry = cloneDeep(character.levelUpKeywordRegistry)

  for (let i = 0; i < n; i++) {
    const firstLanguage = Object.keys(currentLevelUpKeywordRegistry)[0]

    if (!firstLanguage) break

    const firstKeyword = Object.keys(currentLevelUpKeywordRegistry[firstLanguage])[0]

    if (!firstKeyword) {
      delete currentLevelUpKeywordRegistry[firstLanguage]
      i--

      continue
    }

    if (currentLevelUpKeywordRegistry[firstLanguage][firstKeyword] <= 0) {
      delete currentLevelUpKeywordRegistry[firstLanguage][firstKeyword]
      i--

      continue
    }

    if (!nextLevelUpKeywordRegistry[firstLanguage]) nextLevelUpKeywordRegistry[firstLanguage] = {}
    if (!nextLevelUpKeywordRegistry[firstLanguage][firstKeyword]) nextLevelUpKeywordRegistry[firstLanguage][firstKeyword] = 0

    currentLevelUpKeywordRegistry[firstLanguage][firstKeyword]--
    nextLevelUpKeywordRegistry[firstLanguage][firstKeyword]++
  }

  return nextLevelUpKeywordRegistry
}

export default pickLevelUpKeywordRegistry
