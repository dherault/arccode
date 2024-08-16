import { useEffect } from 'react'

import countKeywordRegistry from '~logic/countKeywordRegistry'

import useCharacter from '~hooks/character/useCharacter'
// import usePrevious from '~hooks/common/usePrevious'

import { Button } from '~components/ui/Button'
import LevelUpChest from '~components/character/LevelUpChest'

function LevelUp() {
  const { character, isLevelUpOpen, toggleLevelUp, levelUpsKeywords, updateLevelUpsKeywords } = useCharacter()

  // const previousUnlockedItems = usePrevious(character.unlockedItems)
  const nLevelUps = countKeywordRegistry(levelUpsKeywords)

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
        {character.levelUps}
        {' '}
        level up
        {character.levelUps > 1 ? 's' : ''}
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
          onClick={() => nLevelUps === 1 ? updateLevelUpsKeywords(character.levelUps) : updateLevelUpsKeywords(1)}
        >
          {nLevelUps === 1 ? `Open ${character.levelUps} at once` : 'Open only one'}
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
