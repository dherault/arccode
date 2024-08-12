import useCharacter from '~hooks/character/useCharacter'

import CharacterGear from '~components/character/CharacterGear'

function CharacterProfile() {
  const character = useCharacter()

  return (
    <div className="mt-8 container">
      <h1 className="font-display font-bold text-4xl text-center">
        {character.name || '(An unnamed character)'}
      </h1>
      <div className="mt-4 flex items-start gap-8">
        <CharacterGear />
      </div>
    </div>
  )
}

export default CharacterProfile
