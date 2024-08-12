import type { ItemType } from '~types'

type Props = {
  type: ItemType
  itemId: string | null
}

function CharacterGearSlot({ type, itemId }: Props) {
  if (false) console.log(type, itemId)

  return (
    <div className="w-24 aspect-square border-2 bg-white z-10" />
  )
}

export default CharacterGearSlot
