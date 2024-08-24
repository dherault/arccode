import { CHARACTER_GEAR_TYPES, ITEM_TYPE_LABELS, RARITY_ORDERS } from '~constants'

import useCharacter from '~hooks/character/useCharacter'

import { Button } from '~components/ui/Button'
import GearCard from '~components/character/gear/GearCard'
import Spinner from '~components/common/Spinner'
import Avatar from '~components/character/gear/Avatar'

import items from '~data/items'

function LevelUpReward() {
  const { levelUpUnlockedItems, levelUpCount, levelUpLoading, closeChest } = useCharacter()

  const levelUpsUnlockedItemsEntries = Object.entries(levelUpUnlockedItems)

  if (levelUpLoading) {
    return (
      <div className="p-4 bg-white border rounded overflow-auto shadow-lg select-none">
        <Spinner className="w-6" />
      </div>
    )
  }

  if (!levelUpsUnlockedItemsEntries.length) return null

  return (
    <div className="p-4 bg-white border rounded max-h-[320px] overflow-auto shadow-lg select-none">
      <div className="text-center">
        You unlocked:
      </div>
      <div
        className="mt-4 mx-auto w-fit grid gap-y-2 gap-x-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(4, levelUpsUnlockedItemsEntries.length)}, 1fr)` }}
      >
        {levelUpsUnlockedItemsEntries
        .filter(([itemId]) => items[itemId])
        .map(([itemId, amount]) => [items[itemId], amount] as const)
        .sort(([a], [b]) => RARITY_ORDERS[a.rarity] - RARITY_ORDERS[b.rarity])
        .map(([item, amount]) => (
          <div
            key={item.id}
            className="relative w-[88px] aspect-square flex flex-col items-center text-center"
          >
            <div className="mb-1 text-xs font-light text-neutral-500">
              {ITEM_TYPE_LABELS[item.type]}
            </div>
            {CHARACTER_GEAR_TYPES.includes(item.type) && (
              <GearCard item={item} />
            )}
            {item.type === 'avatar' && (
              <div className="w-20 grow">
                <Avatar item={item} />
              </div>
            )}
            {!!item.name && (
              <div className="mt-1 text-xs text-neutral-700 leading-none">
                {item.name}
              </div>
            )}
            {amount > 1 && (
              <div className="absolute top-2 -left-3 h-6 w-6 bg-neutral-50 border rounded-full text-xs text-neutral-500 flex items-center justify-center z-30">
                x
                {amount}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button onClick={closeChest}>
          {levelUpCount > 0 ? 'Open next box' : 'Close'}
        </Button>
      </div>
    </div>
  )
}

export default LevelUpReward
