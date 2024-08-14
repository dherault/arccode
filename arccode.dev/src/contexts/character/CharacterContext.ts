import { createContext } from 'react'

import type { Character } from '~types'

export type CharacterContextType = {
  character: Character
  isEditable: boolean
  updateCharacter: (payload: Record<string, any>) => Promise<void>
}

export default createContext<CharacterContextType>({
  character: {} as Character,
  isEditable: false,
  updateCharacter: async () => {},
})
