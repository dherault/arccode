import useCharacter from '~hooks/character/useCharacter'

function CharacterProfile() {
  const character = useCharacter()

  return (
    <>
      CharacterProfile
      <br />
      {character.name}
    </>
  )
}

export default CharacterProfile
