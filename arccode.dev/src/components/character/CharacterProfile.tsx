import { Helmet } from 'react-helmet'
import { useMemo } from 'react'

import checkHasLeveledUp from '~logic/checkLeveledUps'

import useCharacter from '~hooks/character/useCharacter'

import { Button } from '~components/ui/Button'
import CharacterGear from '~components/character/CharacterGear'
import CharacterKeywords from '~components/character/CharacterKeywords'

function CharacterProfile() {
  const { character } = useCharacter()
  const characterName = character.name || '(An unnamed character)'

  const nLevelUps = useMemo(() => checkHasLeveledUp(character), [character])

  return (
    <>
      <Helmet>
        <title>
          {characterName}
          {' '}
          | Arccode
        </title>
      </Helmet>
      <div className="-mt-10 container">
        <h1 className="font-display font-bold text-4xl text-center">
          {characterName}
        </h1>
        {nLevelUps > 0 && (
          <div className="mt-4 mb-4 flex flex-col items-center gap-2">
            <div className="text-blue">
              You have
              {' '}
              {nLevelUps}
              {' '}
              level up
              {nLevelUps > 1 ? 's' : ''}
              {' '}
              available!
            </div>
            <Button>
              Level up!
            </Button>
          </div>
        )}
        <div className="mt-8 flex items-start gap-8">
          <CharacterGear />
          <div className="grow">
            <CharacterKeywords />
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterProfile
