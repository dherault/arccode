import type { ItemType } from '~types'

type Props = {
  type: ItemType
  itemId: string | null
}

function CharacterGearSlot({ type, itemId }: Props) {
  if (false) console.log(type, itemId)

  return (
    <div className="w-[88px] aspect-square border-2 bg-white z-10">
      {!itemId && (
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
