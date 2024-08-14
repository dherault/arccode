import { motion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

import usePreloadImage from '~hooks/common/usePreloadImage'

import treasureChests from '~data/treasure-chests'

let animationTimeoutId: NodeJS.Timeout | null = null

const SHAKE_DURATION = 500
const SHRINK_DURATION = 150

function LevelUpChest() {
  const [treasureChestIndex, setTreasureChestIndex] = useState(Math.round(Math.random() * treasureChests.length))
  const [animation, setAnimation] = useState('shake')
  const [open, setOpen] = useState(false)
  const [timesClicked, setTimesClicked] = useState(0)

  if (false) console.log(setTreasureChestIndex)

  const treasureChest = useMemo(() => treasureChests[treasureChestIndex], [treasureChestIndex])

  usePreloadImage(`/images/treasure-chests/${treasureChest.open}`)

  const handleClick = useCallback(() => {
    if (animation === 'shake' || animation === 'nudge') {
      if (animationTimeoutId) clearTimeout(animationTimeoutId)

      if (timesClicked === 2) {
        setAnimation('shrink')

        animationTimeoutId = setTimeout(() => {
          setOpen(true)
          setAnimation('grow')
        }, SHRINK_DURATION)
      }
      else {
        setTimesClicked(timesClicked + 1)
        setAnimation('nudge')

        animationTimeoutId = setTimeout(() => {
          setAnimation('shake')

        }, SHAKE_DURATION)
      }
    }
  }, [
    animation,
    timesClicked,
  ])

  return (
    <div
      className="h-[384px] w-[384px] cursor-pointer rounded-full overflow-hidden"
      onClick={handleClick}
    >
      <motion.div
        animate={animation}
        initial={{
          rotate: 0,
          top: 0,
          scale: 1,
        }}
        variants={{
          shake: {
            rotate: [-2, 2, 0, -2],
            transition: {
              duration: SHAKE_DURATION / 1000,
              repeat: Infinity,
            },
          },
          nudge: {
            rotate: [-12, 12, 0],
            top: [0, -32, 16, -32],
            transition: {
              duration: SHAKE_DURATION / 1000,
            },
          },
          shrink: {
            scale: 0,
            transition: {
              duration: SHRINK_DURATION / 1000,
            },
          },
          grow: {
            scale: 1,
            transition: {
              duration: SHRINK_DURATION / 1000,
            },
          },
        }}
        transition={{
          duration: 0.3,
          type: 'tween',
        }}
        className="relative h-full w-full"
      >
        <img
          src={`/images/treasure-chests/${open ? treasureChest.open : treasureChest.closed}`}
          alt="Treasure chest"
          className="absolute -inset-24 min-w-[calc(100%+2*96px)]"
        />
      </motion.div>
    </div>
  )
}

export default LevelUpChest
