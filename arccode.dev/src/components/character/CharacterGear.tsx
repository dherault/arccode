import useCharacter from '~hooks/character/useCharacter'

import CharacterGearSlot from '~components/character/CharacterGearSlot'

import items from '~data/items'

function CharacterGear() {
  const { character } = useCharacter()

  const avatar = items[character.avatarItemId]

  if (!avatar) return null

  return (
    <div className="relative w-[448px] grid grid-cols-2 gap-y-14">
      <img
        src={`/images/avatars/${avatar.image}`}
        alt={avatar.name}
        draggable={false}
        className="absolute inset-0 z-0 select-none"
        style={{
          filter: 'invert(96%) sepia(6%) saturate(96%) hue-rotate(202deg) brightness(89%) contrast(93%)',
        }}
      />
      <CharacterGearSlot
        type="helm"
        slotId="helmItemId"
        itemId={character.helmItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="amulet"
          slotId="amuletItemId"
          itemId={character.amuletItemId}
        />
      </div>
      <CharacterGearSlot
        type="armor"
        slotId="armorItemId"
        itemId={character.armorItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="ring"
          slotId="ringItemId"
          itemId={character.ringItemId}
        />
      </div>
      <CharacterGearSlot
        type="main-hand"
        slotId="mainHandItemId"
        itemId={character.mainHandItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="off-hand"
          slotId="offHandItemId"
          itemId={character.offHandItemId}
        />
      </div>
      <CharacterGearSlot
        type="gloves"
        slotId="glovesItemId"
        itemId={character.glovesItemId}
      />
      <div className="flex justify-end">
        <CharacterGearSlot
          type="boots"
          slotId="bootsItemId"
          itemId={character.bootsItemId}
        />
      </div>
      <div className="col-span-2 flex justify-between">
        <CharacterGearSlot
          type="spell"
          slotId="spell1ItemId"
          itemId={character.spell1ItemId}
        />
        <CharacterGearSlot
          type="spell"
          slotId="spell2ItemId"
          itemId={character.spell2ItemId}
        />
        <CharacterGearSlot
          type="spell"
          slotId="spell3ItemId"
          itemId={character.spell3ItemId}
        />
        <CharacterGearSlot
          type="spell"
          slotId="spell4ItemId"
          itemId={character.spell4ItemId}
        />
      </div>
    </div>
  )
}

export default CharacterGear
