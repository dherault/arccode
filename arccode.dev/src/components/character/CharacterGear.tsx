import useCharacter from '~hooks/character/useCharacter'

import CharacterGearSlot from '~components/character/CharacterGearSlot'

import items from '~data/items'

function CharacterGear() {
  const character = useCharacter()

  const avatar = items[character.avatarItemId]

  if (!avatar) return null

  return (
    <div className="pt-16 relative w-[448px] grid grid-cols-2 gap-y-16">
      <img
        src={`/images/avatars/${avatar.image}`}
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
      <div className="flex justify-end">
        <CharacterGearSlot
          type="amulet"
          itemId={null}
        />
      </div>
      <CharacterGearSlot
        type="armor"
        itemId={null}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="ring"
          itemId={null}
        />
      </div>
      <CharacterGearSlot
        type="main-hand"
        itemId={null}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="off-hand"
          itemId={null}
        />
      </div>
      <CharacterGearSlot
        type="gloves"
        itemId={null}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="boots"
          itemId={null}
        />
      </div>
    </div>
  )
}

export default CharacterGear
