import { createContext } from 'react'

import type { Character } from '~types'

export type CharacterContextType = {
  character: Character
  isEditable: boolean
  isLevelUpOpen: boolean
  toggleLevelUp: () => void
  updateCharacter: (payload: Record<string, any>) => Promise<void>
}

export default createContext<CharacterContextType>({
  character: {} as Character,
  isEditable: false,
  isLevelUpOpen: false,
  toggleLevelUp: () => {},
  updateCharacter: async () => {},
})
