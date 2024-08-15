import type { Character } from './types'
import getLevelUps from './getLevelUps'

describe('getLevelUps', () => {
  test('gets levelUps', () => {
    const input: Character = {
      name: '',
      level: 1,
      levelUps: 0,
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
      levelUps: 2,
      levelUpsKeywords: {
        javascript: {
          const: 1,
          function: 1,
          break: 1,
        },
      },
    }

    expect(getLevelUps(input)).toEqual(output)
  })
})
