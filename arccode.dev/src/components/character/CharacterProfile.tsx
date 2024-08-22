import useCharacter from '~hooks/character/useCharacter'

import CharacterGear from '~components/character/gear/CharacterGear'
import CharacterKeywords from '~components/character/keywords/CharacterKeywords'
import CharacterHeader from '~components/character/CharacterHeader'
import Guilds from '~components/guild/Guilds'

function CharacterProfile() {
  const { isEditable } = useCharacter()

  return (
    <div className="px-4 lg:px-8 pb-8 container">
      <div className="mb-2 md:mb-12 flex flex-col lg:flex-row lg:items-start gap-x-8 xl:gap-x-16">
        <div className="block lg:hidden">
          <CharacterHeader />
        </div>
        <CharacterGear />
        <div className="mt-16 lg:mt-0 grow">
          <div className="hidden lg:block">
            <CharacterHeader />
          </div>
          <CharacterKeywords />
        </div>
      </div>
      {isEditable && <Guilds />}
    </div>
  )
}

export default CharacterProfile
