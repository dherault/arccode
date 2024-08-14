import useCharacter from '~hooks/character/useCharacter'

import { Button } from '~components/ui/Button'
import LevelUpChest from '~components/character/LevelUpChest'

type Props = {
  onClose: () => void
}

function LevelUp({ onClose }: Props) {
  const { character } = useCharacter()

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
      <div className="mt-16">
        <Button
          variant="ghost"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default LevelUp
