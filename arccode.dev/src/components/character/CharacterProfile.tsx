import { Helmet } from 'react-helmet'

import useCharacter from '~hooks/character/useCharacter'

import CharacterGear from '~components/character/CharacterGear'
import CharacterKeywords from '~components/character/CharacterKeywords'
import LevelUpContainer from '~components/character/LevelUpContainer'

function CharacterProfile() {
  const { character, isEditable } = useCharacter()
  const characterName = character.name || '(An unnamed character)'

  return (
    <>
      <Helmet>
        <title>
          {characterName}
          {' '}
          | Arccode
        </title>
      </Helmet>
      <div className="container flex items-start gap-16">
        <CharacterGear />
        <div className="grow">
          <div className="mb-3 flex items-baseline gap-4">
            <h1 className="font-display font-bold text-4xl">
              {characterName}
            </h1>
            <div>
              Level
              {' '}
              {character.level}
            </div>
          </div>
          <CharacterKeywords />
        </div>
      </div>
      {isEditable && <LevelUpContainer />}
    </>
  )
}

export default CharacterProfile
