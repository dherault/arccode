import { createContext } from 'react'

import type { Character, KeywordRegistry } from '~types'

export type CharacterContextType = {
  character: Character
  isEditable: boolean
  updateCharacter: (payload: Record<string, any>) => Promise<void>
  isLevelUpOpen: boolean
  toggleLevelUp: () => void
  levelUpsKeywords: KeywordRegistry
  updateLevelUpsKeywords: (n: number) => void
  levelUpsCursor: number
  levelUpsCount: number
  levelUpsMax: number
  levelUpsUnlockedItems: Record<string, number>
  openChest: () => Promise<void>
  closeChest: () => Promise<void>
}

export default createContext<CharacterContextType>({
  character: {} as Character,
  isEditable: false,
  updateCharacter: async () => {},
  isLevelUpOpen: false,
  toggleLevelUp: () => {},
  levelUpsKeywords: {},
  updateLevelUpsKeywords: () => {},
  levelUpsCursor: 0,
  levelUpsCount: 0,
  levelUpsMax: 0,
  levelUpsUnlockedItems: {},
  openChest: async () => {},
  closeChest: async () => {},
})
