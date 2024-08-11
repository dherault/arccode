import type { ItemType } from '~types'

type Props = {
  type: ItemType
  itemId: string | null
}

function CharacterGearSlot({ type, itemId }: Props) {
  if (false) console.log(itemId)

  return (
    <div className="border-2 bg-white z-10">
      {type}
    </div>
  )
}

export default CharacterGearSlot
