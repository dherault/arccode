import type { Character } from '../types'

import getLevelUpsKeywords from './getLevelUpsKeywords'

describe('getLevelUpsKeywords', () => {
  test('gets levelUpsKeywords', () => {
    const inputCharacter: Character = {
      name: '',
      level: 1,
      levelUpsKeywordRegistry: {
        javascript: {
          break: 1,
        },
      },
      keywordRegistry: {
        javascript: {
          break: 3,
        },
        c: {
          break: 10,
        },
      },
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
    const inputKeywordRegistry = {
      javascript: {
        const: 12,
        function: 3,
      },
    }

    const output = {
      javascript: {
        break: 1,
        const: 2,
        function: 1,
      },
    }

    expect(getLevelUpsKeywords(inputCharacter, inputKeywordRegistry)).toEqual(output)
  })
})
