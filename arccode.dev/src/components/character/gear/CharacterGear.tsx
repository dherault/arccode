import { useState } from 'react'

import useCharacter from '~hooks/character/useCharacter'

import CharacterGearSlot from '~components/character/gear/CharacterGearSlot'
import Avatars from '~components/character/gear/Avatars'

import items from '~data/items'

function CharacterGear() {
  const { character } = useCharacter()

  const [isAvatarOpen, setIsAvatarOpen] = useState(false)

  const avatar = items[character.avatarItemId]

  if (!avatar) return null

  return (
    <>
      <div className="group mx-auto relative w-full max-w-[448px] lg:w-auto lg:min-w-[448px] lg:max-w-auto grid grid-cols-2 gap-y-14">
        <img
          src={`/images/avatars/resized/${avatar.image}`}
          alt={avatar.name}
          draggable={false}
          className="absolute inset-0 z-0 select-none"
          style={{
            filter: 'invert(96%) sepia(6%) saturate(96%) hue-rotate(202deg) brightness(89%) contrast(93%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center sm:opacity-0 group-hover:opacity-100">
          <div
            className="hover:underline cursor-pointer text-neutral-500"
            onClick={() => setIsAvatarOpen(true)}
          >
            Change avatar
          </div>
        </div>
        <div className="flex">
          <CharacterGearSlot
            type="helm"
            slotId="helmItemId"
            itemId={character.helmItemId}
          />
        </div>
        <div className="flex justify-end">
          <CharacterGearSlot
            type="amulet"
            slotId="amuletItemId"
            itemId={character.amuletItemId}
          />
        </div>
        <div className="flex">
          <CharacterGearSlot
            type="armor"
            slotId="armorItemId"
            itemId={character.armorItemId}
          />
        </div>
        <div className="flex justify-end">
          <CharacterGearSlot
            type="ring"
            slotId="ringItemId"
            itemId={character.ringItemId}
          />
        </div>
        <div className="flex">
          <CharacterGearSlot
            type="main-hand"
            slotId="mainHandItemId"
            itemId={character.mainHandItemId}
          />
        </div>
        <div className="flex justify-end">
          <CharacterGearSlot
            type="off-hand"
            slotId="offHandItemId"
            itemId={character.offHandItemId}
          />
        </div>
        <div className="flex">
          <CharacterGearSlot
            type="gloves"
            slotId="glovesItemId"
            itemId={character.glovesItemId}
          />
        </div>
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
            filteredItemIds={[
              character.spell2ItemId,
              character.spell3ItemId,
              character.spell4ItemId,
            ]}
          />
          <CharacterGearSlot
            type="spell"
            slotId="spell2ItemId"
            itemId={character.spell2ItemId}
            filteredItemIds={[
              character.spell1ItemId,
              character.spell3ItemId,
              character.spell4ItemId,
            ]}
          />
          <CharacterGearSlot
            type="spell"
            slotId="spell3ItemId"
            itemId={character.spell3ItemId}
            filteredItemIds={[
              character.spell1ItemId,
              character.spell2ItemId,
              character.spell4ItemId,
            ]}
          />
          <CharacterGearSlot
            type="spell"
            slotId="spell4ItemId"
            itemId={character.spell4ItemId}
            filteredItemIds={[
              character.spell1ItemId,
              character.spell2ItemId,
              character.spell3ItemId,
            ]}
          />
        </div>
      </div>
      <Avatars
        open={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
      />
    </>
  )
}

export default CharacterGear
