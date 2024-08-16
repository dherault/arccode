import { useEffect } from 'react'

import useCharacter from '~hooks/character/useCharacter'

import { Button } from '~components/ui/Button'
import LevelUpChest from '~components/character/LevelUpChest'

function LevelUp() {
  const {
    levelUpsCount,
    levelUpsMax,
    isLevelUpOpen,
    toggleLevelUp,
    updateLevelUpsKeywords,
  } = useCharacter()

  useEffect(() => {
    updateLevelUpsKeywords(1)
  }, [
    isLevelUpOpen,
    updateLevelUpsKeywords,
  ])

  return (
    <div className="flex flex-col items-center">
      <div>
        You have
        {' '}
        {levelUpsMax}
        {' '}
        level up
        {levelUpsMax > 1 ? 's' : ''}
        {' '}
        available.
      </div>
      <div className="mt-16 flex items-center gap-8">
        <img
          src="/images/onboarding/laurel-left.png"
          alt="Laurel left"
          className="h-44"
          style={{
            filter: 'invert(53%) sepia(54%) saturate(4980%) hue-rotate(198deg) brightness(102%) contrast(101%)',
          }}
        />
        <LevelUpChest />
        <img
          src="/images/onboarding/laurel-right.png"
          alt="Laurel right"
          className="h-44"
          style={{
            filter: 'invert(53%) sepia(54%) saturate(4980%) hue-rotate(198deg) brightness(102%) contrast(101%)',
          }}
        />
      </div>
      <div className="mt-16 flex justify-center">
        <Button
          variant="ghost"
          onClick={() => levelUpsCount === 1 ? updateLevelUpsKeywords(levelUpsMax) : updateLevelUpsKeywords(1)}
        >
          {levelUpsCount === 1 ? `Open ${levelUpsMax} at once` : 'Open only one'}
        </Button>
        <Button
          variant="ghost"
          onClick={toggleLevelUp}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default LevelUp
