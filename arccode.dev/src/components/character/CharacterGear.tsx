import useCharacter from '~hooks/character/useCharacter'

import items from '~data/items'

function CharacterGear() {
  const character = useCharacter()

  const avatar = items[character.avatarItemId]

  if (!avatar) return null

  return (
    <div>
      <img
        src={avatar.image}
        alt={avatar.name}
        className="w-[512px]"
      />
    </div>
  )
}

export default CharacterGear
