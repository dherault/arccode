import useCharacter from '~hooks/character/useCharacter'

import CharacterGear from '~components/character/CharacterGear'

function CharacterProfile() {
  const character = useCharacter()

  return (
    <div className="pt-8 container">
      <h1 className="font-bold text-3xl">
        {character.name}
      </h1>
      <CharacterGear />
    </div>
  )
}

export default CharacterProfile
