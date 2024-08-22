import CharacterGear from '~components/character/gear/CharacterGear'
import CharacterKeywords from '~components/character/keywords/CharacterKeywords'
import CharacterHeader from '~components/character/CharacterHeader'

function CharacterProfile() {
  return (
    <div className="px-4 lg:px-8 container flex flex-col lg:flex-row lg:items-start gap-x-8 xl:gap-x-16">
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
  )
}

export default CharacterProfile
