import { motion } from 'framer-motion'
import _ from 'clsx'

import useCharacter from '~hooks/character/useCharacter'

import sortItems from '~utils/items/sortItems'

import { Button } from '~components/ui/Button'
import Avatar from '~components/character/gear/Avatar'

import items from '~data/items'

type Props = {
  open: boolean
  onClose: () => void
}

function Avatars({ open, onClose }: Props) {
  const { character, updateCharacter } = useCharacter()

  const unlockedAvatars = Object.entries(character.unlockedItems)
    .filter(([itemId, count]) => items[itemId]?.type === 'avatar' && count > 0)
    .map(([itemId]) => items[itemId])
    .sort(sortItems)

  return (
    <motion.div
      initial={{ display: 'none', opacity: 0 }}
      animate={open ? 'open' : 'close'}
      variants={{
        open: { display: 'block', opacity: 1 },
        close: { display: 'none', opacity: 0 },
      }}
      className="pt-[72px] pb-16 fixed inset-0 bg-white z-30 overflow-y-auto"
    >
      <div className="container">
        <h1 className="text-3xl font-semibold">
          Choose your avatar
        </h1>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {unlockedAvatars.map(avatar => (
            <div
              key={avatar.id}
              className={_('cursor-pointer border border-transparent', {
                '!border-blue': character.avatarItemId === avatar.id,
              })}
              onClick={() => {
                updateCharacter({ avatarItemId: avatar.id })
                onClose()
              }}
            >
              <Avatar item={avatar} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default Avatars
