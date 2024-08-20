import useCharacter from '~hooks/character/useCharacter'

import { Button } from '~components/ui/Button'
import LevelUpChest from '~components/character/LevelUpChest'

function LevelUp() {
  const {
    levelUpCount,
    levelUpMax,
    isChestOpen,
    closeLevelUp,
    updateLevelUpCount,
  } = useCharacter()

  return (
    <div className="flex flex-col items-center">
      <div>
        You have
        {' '}
        {levelUpMax}
        {' '}
        level up
        {levelUpMax > 1 ? 's' : ''}
        {' '}
        available.
      </div>
      <div className="mt-8 md:mt-16 flex items-center gap-8 select-none">
        <img
          src="/images/onboarding/laurel-left.png"
          alt="Laurel left"
          className="hidden md:block h-44"
          style={{
            filter: 'invert(53%) sepia(54%) saturate(4980%) hue-rotate(198deg) brightness(102%) contrast(101%)',
          }}
        />
        <LevelUpChest />
        <img
          src="/images/onboarding/laurel-right.png"
          alt="Laurel right"
          className="hidden md:block h-44"
          style={{
            filter: 'invert(53%) sepia(54%) saturate(4980%) hue-rotate(198deg) brightness(102%) contrast(101%)',
          }}
        />
      </div>
      <div className="mt-8 md:mt-16 flex justify-center">
        {!isChestOpen && (
          <Button
            variant="ghost"
            onClick={() => levelUpCount === 1 ? updateLevelUpCount(levelUpMax) : updateLevelUpCount(1)}
          >
            {levelUpCount === 1 ? `Open ${levelUpMax} at once` : 'Open only one'}
          </Button>
        ) }
        <Button
          variant="ghost"
          onClick={closeLevelUp}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default LevelUp
