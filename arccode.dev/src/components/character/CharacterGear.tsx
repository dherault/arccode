import useCharacter from '~hooks/character/useCharacter'

import CharacterGearSlot from '~components/character/CharacterGearSlot'

import items from '~data/items'

function CharacterGear() {
  const character = useCharacter()

  const avatar = items[character.avatarItemId]

  if (!avatar) return null

  return (
    <div className="relative w-[512px] grid grid-cols-2">
      <img
        src={avatar.image}
        alt={avatar.name}
        className="absolute inset-0 z-0"
        style={{
          filter: 'invert(96%) sepia(6%) saturate(96%) hue-rotate(202deg) brightness(89%) contrast(93%)',
        }}
      />
      <CharacterGearSlot
        type="helm"
        itemId={null}
      />
      <CharacterGearSlot
        type="amulet"
        itemId={null}
      />
      <CharacterGearSlot
        type="off-hand"
        itemId={null}
      />
      <CharacterGearSlot
        type="main-hand"
        itemId={null}
      />
      <div className="col-span-2 flex flex-col items-center z-10">
        <div className="w-1/2">
          <CharacterGearSlot
            type="armor"
            itemId={null}
          />
        </div>
      </div>
      <CharacterGearSlot
        type="ring"
        itemId={null}
      />
      <CharacterGearSlot
        type="ring"
        itemId={null}
      />
      <CharacterGearSlot
        type="gloves"
        itemId={null}
      />
      <CharacterGearSlot
        type="boots"
        itemId={null}
      />

    </div>
  )
}

export default CharacterGear
