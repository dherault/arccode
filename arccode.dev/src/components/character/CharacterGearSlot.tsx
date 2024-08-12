import type { ItemType } from '~types'

import Item from '~components/character/Item'

import items from '~data/items'

type Props = {
  type: ItemType
  itemId: string
}

function CharacterGearSlot({ type, itemId }: Props) {
  const item = items[itemId] ?? null

  return (
    <div className="w-[88px] aspect-square border-2 bg-white z-10">
      {item && (
        <Item itemId={itemId} />
      )}
      {!item && (
        <img
          src={`/images/gear-placeholders/${type}.png`}
          alt={type}
          draggable={false}
          className="w-full h-full grayscale opacity-20 "
        />
      )}
    </div>
  )
}

export default CharacterGearSlot
