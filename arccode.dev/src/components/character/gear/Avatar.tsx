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
  showRarity?: boolean
}

function Avatar({ item, showRarity = true }: Props) {
  return (
    <div className="relative h-full aspect-[512/768]">
      <div className="absolute inset-0 overflow-hidden">
        {showRarity && (
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              <div
                className="w-5 h-5 rotate-45 absolute -top-2.5 -right-2.5 z-20"
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
        )}
      </div>
      <img
        src={`/images/avatars/resized/${item.image}`}
        alt="Avatar"
        draggable={false}
        className="absolute inset-0 z-10"
        style={{
          filter: 'invert(96%) sepia(6%) saturate(96%) hue-rotate(202deg) brightness(89%) contrast(93%)',
        }}
      />
    </div>
  )
}

export default Avatar
