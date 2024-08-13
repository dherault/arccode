import { Helmet } from 'react-helmet'
import { useMemo } from 'react'

import checkHasLeveledUp from '~logic/checkLeveledUps'

import useCharacter from '~hooks/character/useCharacter'

import CharacterGear from '~components/character/CharacterGear'
import CharacterKeywords from '~components/character/CharacterKeywords'
import ShimmerButton from '~components/magicui/ShimmerButton'

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
        {nLevelUps > 0 && (
          <div className="flex justify-center">
            <ShimmerButton>
              Level up!
            </ShimmerButton>
          </div>
        )}
        <h1 className="font-display font-bold text-4xl text-center">
          {characterName}
        </h1>
        <div className="mt-8 flex items-start gap-8">
          <CharacterGear />
          <div className="grow">
            {nLevelUps}
            <CharacterKeywords />
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterProfile
