
import CharacterGear from '~components/character/CharacterGear'
import CharacterKeywords from '~components/character/CharacterKeywords'
import CharacterHeader from '~components/character/CharacterHeader'

function CharacterProfile() {
  return (
    <div className="px-4 md:px-8 container flex flex-col md:flex-row items-start gap-x-16">
      <div className="block md:hidden">
        <CharacterHeader />
      </div>
      <CharacterGear />
      <div className="mt-16 md:mt-0 grow">
        <div className="hidden md:block">
          <CharacterHeader />
        </div>
        <CharacterKeywords />
      </div>
    </div>
  )
}

export default CharacterProfile
