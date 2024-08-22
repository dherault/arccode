import type { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet'

import useCharacter from '~hooks/character/useCharacter'

import LevelUpContainer from '~components/character/level-up/LevelUpContainer'

function CharacterLayout({ children }: PropsWithChildren) {
  const { character, isEditable } = useCharacter()

  return (
    <>
      <Helmet>
        <title>
          {character.name}
          {' '}
          | Arccode
        </title>
      </Helmet>
      {children}
      {isEditable && <LevelUpContainer />}
    </>
  )
}

export default CharacterLayout
