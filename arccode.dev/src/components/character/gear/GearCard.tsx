import type { Item } from '~types'

import { RARITY_COLORS } from '~constants'

import capitalize from '~utils/string/capitalize'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~components/ui/Tooltip'

type Props = {
  item: Item
}

function GearCard({ item }: Props) {
  return (
    <div className="w-full h-full border bg-white rounded overflow-hidden relative flex items-start justify-end">
      <Tooltip delayDuration={150}>
        <TooltipTrigger>
          <div
            className="w-5 h-5 rotate-45 relative -top-2.5 -right-2.5 z-20"
            style={{
              backgroundColor: item ? RARITY_COLORS[item.rarity] : undefined,
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            {capitalize(item.rarity)}
          </div>
        </TooltipContent>
      </Tooltip>
      <img
        src={`/images/gears/${item.image}`}
        alt={item.name}
        draggable={false}
        className="absolute inset-0 z-10"
        style={{ padding: (item.imagePadding ?? true) ? '10%' : undefined }}
      />
    </div>
  )
}

export default GearCard
