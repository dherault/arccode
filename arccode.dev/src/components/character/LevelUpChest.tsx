import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'

import usePreloadImage from '~hooks/common/usePreloadImage'
import useCharacter from '~hooks/character/useCharacter'

import LevelUpReward from '~components/character/LevelUpReward'

import treasureChests from '~data/treasure-chests'

let animationTimeoutId: NodeJS.Timeout | null = null

const SHAKE_DURATION = 500
const SHRINK_DURATION = 150
const POP_DURATION = 300

function LevelUpChest() {
  const { levelUpCount: levelUpsCount, levelUpCursor: levelUpsCursor, openChest } = useCharacter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const treasureChestIndex = useMemo(() => Math.round(Math.random() * treasureChests.length), [levelUpsCursor])
  const [animation, setAnimation] = useState('shake')
  const [open, setOpen] = useState(false)
  const [rewardDisplayed, setRewardDisplayed] = useState(false)
  const [timesClicked, setTimesClicked] = useState(0)

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
          openChest()

          setTimeout(() => {
            setRewardDisplayed(true)
          }, SHRINK_DURATION)
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
    openChest,
  ])

  // Reset chest
  useEffect(() => {
    setAnimation('shake')
    setOpen(false)
    setTimesClicked(0)
    setRewardDisplayed(false)
  }, [
    levelUpsCursor,
  ])

  return (
    <div
      className="h-fit w-fit cursor-pointer rounded-full relative"
      onClick={handleClick}
    >
      <div className="h-[256px] md:h-[384px] w-[256px] md:w-[384px] overflow-hidden relative">
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
        {levelUpsCount > 1 && (
          <div className="absolute top-12 md:top-24 right-12 md:right-24 h-8 w-8 bg-blue text-white rounded-full flex items-center justify-center">
            {levelUpsCount}
          </div>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={rewardDisplayed ? 'pop-in' : undefined}
          initial={{
            scale: 0,
            x: 0,
            y: -42,
          }}
          variants={{
            'pop-in': {
              scale: 1,
              x: [0, -42, 0],
              y: [0, -42, 0],
              transition: {
                type: 'tween',
                delay: 0.1,
                duration: POP_DURATION / 1000,
              },
            },
          }}
          className="relative"
        >
          <LevelUpReward />
        </motion.div>
      </div>
    </div>
  )
}

export default LevelUpChest
