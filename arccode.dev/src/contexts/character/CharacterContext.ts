import { createContext } from 'react'

import type { Character, KeywordRegistry } from '~types'

export type CharacterContextType = {
  character: Character
  isEditable: boolean
  updateCharacter: (payload: Record<string, any>) => Promise<void>
  isLevelUpOpen: boolean
  toggleLevelUp: () => void
  levelUpKeywordRegistry: KeywordRegistry
  updateLevelUpKeywordRegistry: (n: number) => void
  levelUpCursor: number
  levelUpCount: number
  levelUpMax: number
  levelUpUnlockedItems: Record<string, number>
  openChest: () => Promise<void>
  closeChest: () => Promise<void>
}

export default createContext<CharacterContextType>({
  character: {} as Character,
  isEditable: false,
  updateCharacter: async () => {},
  isLevelUpOpen: false,
  toggleLevelUp: () => {},
  levelUpKeywordRegistry: {},
  updateLevelUpKeywordRegistry: () => {},
  levelUpCursor: 0,
  levelUpCount: 0,
  levelUpMax: 0,
  levelUpUnlockedItems: {},
  openChest: async () => {},
  closeChest: async () => {},
})
