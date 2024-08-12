import type { Item } from '~types'

import { RARITY_COLORS } from '~constants'

type Props = {
  item: Item
  borderWidth?: number
}

function ItemCard({ item, borderWidth = 1 }: Props) {
  return (
    <div
      className="w-full h-full border bg-white"
      style={{
        borderWidth,
        borderColor: item ? RARITY_COLORS[item.rarity] : undefined,
      }}
    >
      <img
        src={`/images/gears/${item.id}.png`}
        alt={item.name}
        draggable={false}
        className="w-full h-full"
      />
    </div>
  )
}

export default ItemCard
