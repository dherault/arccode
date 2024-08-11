import useCharacter from '~hooks/character/useCharacter'

import CharacterGear from '~components/character/CharacterGear'

function CharacterProfile() {
  const character = useCharacter()

  return (
    <>
      {character.name}
      <div className="container">
        <CharacterGear />
      </div>
    </>
  )
}

export default CharacterProfile
