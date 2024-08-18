import { ITEM_TYPE_LABELS } from '~constants'

import useCharacter from '~hooks/character/useCharacter'

import { Button } from '~components/ui/Button'
import ItemCard from '~components/character/ItemCard'

import items from '~data/items'

function LevelUpReward() {
  const { levelUpsUnlockedItems, levelUpsCount, closeChest } = useCharacter()

  const levelUpsUnlockedItemsEntries = Object.entries(levelUpsUnlockedItems)

  if (!levelUpsUnlockedItemsEntries.length) return null

  return (
    <div className="p-4 bg-white border rounded select-none max-h-[320px] overflow-auto shadow-lg">
      <div className="text-center">
        You unlocked:
      </div>
      <div
        className="mt-4 mx-auto w-fit grid gap-y-2 gap-x-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(4, levelUpsUnlockedItemsEntries.length)}, 1fr)` }}
      >
        {levelUpsUnlockedItemsEntries.map(([itemId, amount]) => (
          <div
            key={itemId}
            className="relative w-[88px] aspect-square flex flex-col items-center text-center"
          >
            <div className="mb-1 text-xs font-light text-neutral-500">
              {ITEM_TYPE_LABELS[items[itemId].type]}
            </div>
            <ItemCard item={items[itemId]} />
            <div className="mt-1 text-xs text-neutral-700 leading-none">
              {items[itemId].name}
            </div>
            {amount > 1 && (
              <div className="absolute top-2 -right-3 h-6 w-6 bg-neutral-50 border rounded-full text-xs text-neutral-500 flex items-center justify-center">
                x
                {amount}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button onClick={closeChest}>
          {levelUpsCount > 0 ? 'Open next box' : 'Close'}
        </Button>
      </div>
    </div>
  )
}

export default LevelUpReward
