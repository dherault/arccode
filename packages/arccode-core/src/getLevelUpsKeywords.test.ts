import type { Character } from './types'
import getLevelUpsKeywords from './getLevelUpsKeywords'

describe('getLevelUpsKeywords', () => {
  test('gets levelUpsKeywords', () => {
    const input: Character = {
      name: '',
      level: 1,
      levelUpsKeywords: {
        javascript: {
          break: 1,
        },
      },
      keywords: {
        javascript: {
          const: 3,
          function: 3,
          break: 3,
        },
        c: {
          break: 10,
        },
      },
      viewedKeywords: {},
      processedKeywords: {
        c: {
          break: 10,
        },
      },
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
        const: 1,
        function: 1,
        break: 1,
      },
    }

    expect(getLevelUpsKeywords(input)).toEqual(output)
  })
})
