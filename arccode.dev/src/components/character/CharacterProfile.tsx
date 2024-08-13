import { Helmet } from 'react-helmet'

import useCharacter from '~hooks/character/useCharacter'

import CharacterGear from '~components/character/CharacterGear'
import CharacterKeywords from '~components/character/CharacterKeywords'

function CharacterProfile() {
  const { character } = useCharacter()
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
      <div className="-mt-10 container">
        <h1 className="font-display font-bold text-4xl text-center">
          {characterName}
        </h1>
        <div className="mt-8 flex items-start gap-8">
          <CharacterGear />
          <div className="grow">
            <CharacterKeywords />
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterProfile
