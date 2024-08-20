import { createContext } from 'react'

import type { Character, KeywordRegistry } from '~types'

export type CharacterContextType = {
  character: Character
  isEditable: boolean
  updateCharacter: (payload: Record<string, any>) => Promise<void>
  isLevelUpOpen: boolean
  isChestOpen: boolean
  levelUpKeywordRegistry: KeywordRegistry
  levelUpCursor: number
  levelUpCount: number
  levelUpMax: number
  levelUpUnlockedItems: Record<string, number>
  levelUpLoading: boolean
  openLevelUp: () => void
  closeLevelUp: () => void
  openChest: () => Promise<void>
  closeChest: () => Promise<void>
  updateLevelUpCount: (n: number) => void
}

export default createContext<CharacterContextType>({
  character: {} as Character,
  isEditable: false,
  updateCharacter: async () => {},
  isLevelUpOpen: false,
  isChestOpen: false,
  levelUpKeywordRegistry: {},
  levelUpCursor: 0,
  levelUpCount: 0,
  levelUpMax: 0,
  levelUpUnlockedItems: {},
  levelUpLoading: false,
  openLevelUp: () => {},
  closeLevelUp: () => {},
  openChest: async () => {},
  closeChest: async () => {},
  updateLevelUpCount: () => {},
})
