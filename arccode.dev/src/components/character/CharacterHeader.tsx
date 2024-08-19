import useCharacter from '~hooks/character/useCharacter'

function CharacterHeader() {
  const { character } = useCharacter()
  const characterName = character.name || '(An unnamed character)'

  return (
    <div className="mb-3 flex flex-wrap items-baseline gap-x-4">
      <h1 className="font-display font-bold text-3xl lg:text-4xl text-nowrap">
        {characterName}
      </h1>
      <div>
        Level
        {' '}
        {character.level}
      </div>
    </div>
  )
}

export default CharacterHeader
