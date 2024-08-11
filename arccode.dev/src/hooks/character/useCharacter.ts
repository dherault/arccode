import { useContext } from 'react'

import CharacterContext from '~contexts/character/CharacterContext'

function useCharacter() {
  return useContext(CharacterContext)
}

export default useCharacter
