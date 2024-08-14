import { createContext } from 'react'

import type { Character, KeywordRegistry } from '~types'

export type CharacterContextType = {
  character: Character
  isEditable: boolean
  levelUps: number
  levelUpsKeywords: KeywordRegistry
  updateCharacter: (payload: Record<string, any>) => Promise<void>
}

export default createContext<CharacterContextType>({
  character: {} as Character,
  isEditable: false,
  levelUps: 0,
  levelUpsKeywords: {},
  updateCharacter: async () => {},
})
