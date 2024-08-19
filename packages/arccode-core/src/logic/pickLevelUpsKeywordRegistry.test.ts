import type { Character } from '../types'

import pickLevelUpsKeywords from './pickLevelUpsKeywordRegistry'

describe('pickLevelUpsKeywords', () => {
  test('picks level up keywords', () => {
    const inputCharacter: Character = {
      name: '',
      level: 1,
      levelUpsKeywordRegistry: {
        javascript: {
          break: 1,
          const: 3,
        },
      },
      keywordRegistry: {},
      displayKeywordRegistry: {},
      lastDailyRecapKeywordRegistry: {},
      unlockedItems: {},
      avatarItemId: '',
      mainHandItemId: '',
      offHandItemId: '',
      helmItemId: '',
      armorItemId: '',
      glovesItemId: '',
      bootsItemId: '',
      amuletItemId: '',
      ringItemId: '',
      spell1ItemId: '',
      spell2ItemId: '',
      spell3ItemId: '',
      spell4ItemId: '',
    }
    const output = {
      javascript: {
        break: 1,
        const: 2,
      },
    }

    expect(pickLevelUpsKeywords(inputCharacter, 3)).toEqual(output)
  })
})
