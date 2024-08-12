import useCharacter from '~hooks/character/useCharacter'

import CharacterGearSlot from '~components/character/CharacterGearSlot'

import items from '~data/items'

function CharacterGear() {
  const character = useCharacter()

  const avatar = items[character.avatarItemId]

  if (!avatar) return null

  return (
    <div className="relative w-[448px] grid grid-cols-2 gap-y-14">
      <img
        src={`/images/avatars/${avatar.image}`}
        alt={avatar.name}
        draggable={false}
        className="absolute inset-0 z-0"
        style={{
          filter: 'invert(96%) sepia(6%) saturate(96%) hue-rotate(202deg) brightness(89%) contrast(93%)',
        }}
      />
      <CharacterGearSlot
        type="helm"
        itemId={character.helmItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="amulet"
          itemId={character.amuletItemId}
        />
      </div>
      <CharacterGearSlot
        type="armor"
        itemId={character.armorItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="ring"
          itemId={character.ringItemId}
        />
      </div>
      <CharacterGearSlot
        type="main-hand"
        itemId={character.mainHandItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="off-hand"
          itemId={character.offHandItemId}
        />
      </div>
      <CharacterGearSlot
        type="gloves"
        itemId={character.glovesItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="boots"
          itemId={character.bootsItemId}
        />
      </div>
      <div className="col-span-2 flex justify-between">
        <CharacterGearSlot
          type="spell"
          itemId={character.spell1ItemId}
        />
        <CharacterGearSlot
          type="spell"
          itemId={character.spell2ItemId}
        />
        <CharacterGearSlot
          type="spell"
          itemId={character.spell3ItemId}
        />
        <CharacterGearSlot
          type="spell"
          itemId={character.spell4ItemId}
        />
      </div>
    </div>
  )
}

export default CharacterGear
