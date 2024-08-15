import type { Item } from '~types'

import { RARITY_COLORS } from '~constants'

type Props = {
  item: Item
  borderWidth?: number
}

function ItemCard({ item, borderWidth = 1 }: Props) {
  return (
    <div
      className="w-full h-full border bg-white rounded overflow-hidden"
      style={{
        borderWidth,
        borderColor: item ? RARITY_COLORS[item.rarity] : undefined,
      }}
    >
      <img
        src={`/images/gears/${item.image}`}
        alt={item.name}
        draggable={false}
        className="w-full h-full"
        style={{ padding: item.imagePadding ? '10%' : undefined }}
      />
    </div>
  )
}

export default ItemCard
