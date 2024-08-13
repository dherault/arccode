import { useCallback, useState } from 'react'
import { CircleSlash2 } from 'lucide-react'
import _ from 'clsx'

import type { CharacterSlot, ItemType } from '~types'

import { ITEM_TYPE_LABELS } from '~constants'

import useCharacter from '~hooks/character/useCharacter'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~components/ui/Popover'
import ItemCard from '~components/character/ItemCard'

import items from '~data/items'

type Props = {
  type: ItemType
  slotId: CharacterSlot
  itemId: string
}

function CharacterGearSlot({ type, slotId, itemId }: Props) {
  const { character, isEditable, updateCharacter } = useCharacter()

  const [open, setOpen] = useState(false)

  const item = items[itemId] ?? null
  const unlockedItemIds = Object.entries(character.unlockedItems)
    .filter(([, value]) => value > 0)
    .map(([key]) => items[key])
    .filter(item => item.type === type)
    .map(item => item.id)

  const handleEquip = useCallback(async (itemId: string) => {
    await updateCharacter({
      [slotId]: itemId,
    })

    setOpen(false)
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
              <div className="w-[88px] aspect-square cursor-pointer">
                <ItemCard
                  item={item}
                  borderWidth={3}
                />
              </div>
              <div className="mt-1 absolute top-full w-[88px] text-xs text-neutral-700 text-center leading-none">
                {item.name}
              </div>
            </>
          )}
          {!item && (
            <div className="w-[88px] aspect-square border bg-white rounded overflow-hidden cursor-pointer">
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
        className={_('w-fit grid gap-4', {
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
            className="w-[66px] aspect-square cursor-pointer"
            onClick={() => handleEquip(itemId)}
          >
            <ItemCard item={items[itemId]} />
          </div>
        ))}
        {!!unlockedItemIds.length && (
          <div
            className="w-[66px] aspect-square cursor-pointer border text-xs text-neutral-200 flex items-center justify-center"
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
