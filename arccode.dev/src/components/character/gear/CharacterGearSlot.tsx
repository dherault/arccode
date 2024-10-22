import { useCallback, useMemo, useState } from 'react'
import { CircleSlash2 } from 'lucide-react'
import _ from 'clsx'

import type { CharacterSlot, ItemType } from '~types'

import { ITEM_TYPE_LABELS, RARITY_ORDERS } from '~constants'

import useCharacter from '~hooks/character/useCharacter'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~components/ui/Popover'
import GearCard from '~components/character/gear/GearCard'

import items from '~data/items'

type Props = {
  type: ItemType
  slotId: CharacterSlot
  itemId: string
  filteredItemIds?: string[]
}

function CharacterGearSlot({ type, slotId, itemId, filteredItemIds = [] }: Props) {
  const { character, isEditable, updateCharacter } = useCharacter()

  const [open, setOpen] = useState(false)

  const item = items[itemId] ?? null
  const unlockedItemIds = useMemo(() => (
    Object.entries(character.unlockedItems)
      .filter(([itemId]) => !filteredItemIds.includes(itemId))
      .filter(([, value]) => value > 0)
      .map(([key]) => items[key])
      .filter(item => item?.type === type)
      .sort((a, b) => RARITY_ORDERS[a.rarity] - RARITY_ORDERS[b.rarity])
      .map(item => item.id)
  ), [
    type,
    filteredItemIds,
    character.unlockedItems,
  ])

  const handleEquip = useCallback(async (itemId: string) => {
    setOpen(false)

    await updateCharacter({
      [slotId]: itemId,
    })
  }, [
    slotId,
    updateCharacter,
  ])

  return (
    <Popover
      open={open && isEditable}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        className="z-10"
        asChild
      >
        <div className="relative select-none">
          {item && (
            <>
              <div className="w-[72px] md:w-[88px] aspect-square cursor-pointer">
                <GearCard item={item} />
              </div>
              <div className="mt-1 absolute top-full w-[72px] md:w-[88px] text-xs text-neutral-700 text-center leading-none">
                {item.name}
              </div>
            </>
          )}
          {!item && (
            <div className="w-[72px] md:w-[88px] aspect-square border bg-white rounded overflow-hidden cursor-pointer">
              <img
                src={`/images/gear-placeholders/${type}.png`}
                alt={type}
                draggable={false}
                className="w-full h-full grayscale opacity-20 "
              />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={event => event.preventDefault()}
        collisionPadding={16}
        className={_('max-h-[300px] w-fit grid gap-4 overflow-y-auto', {
          'grid-cols-2': unlockedItemIds.length === 1,
          'grid-cols-3': unlockedItemIds.length === 2,
          'grid-cols-4': unlockedItemIds.length > 2,
        })}
      >
        {!unlockedItemIds.length && (
          <div className="text-sm text-neutral-500">
            No
            {' '}
            {ITEM_TYPE_LABELS[type].toLowerCase()}
            {' '}
            unlocked
          </div>
        )}
        {unlockedItemIds.map(itemId => (
          <div
            key={itemId}
            className="w-[52px] md:w-[66px] aspect-square cursor-pointer"
            onClick={() => handleEquip(itemId)}
          >
            <GearCard item={items[itemId]} />
          </div>
        ))}
        {!!unlockedItemIds.length && (
          <div
            className="w-[52px] md:w-[66px] aspect-square rounded cursor-pointer border text-xs text-neutral-200 flex items-center justify-center"
            onClick={() => handleEquip('')}
          >
            <CircleSlash2 className="h-4 w-4" />
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default CharacterGearSlot
