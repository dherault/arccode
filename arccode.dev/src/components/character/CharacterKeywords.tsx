import { useMemo } from 'react'

import type { Keyword } from '~types'

import useCharacter from '~hooks/character/useCharacter'

import KeywordCard from '~components/character/KeywordCard'
import KeywordListItem from '~components/character/KeywordListItem'

function CharacterKeywords() {
  const { character } = useCharacter()

  const keywords = useMemo<Keyword[]>(() => (
    Object.entries(character.keywords)
      .map(([language, keywords]) => Object.entries(keywords).map(([name, count]) => ({ language, name, count })))
      .flat()
      .sort((a, b) => b.count - a.count)
  ), [
    character.keywords,
  ])

  const [keyword1, keyword2, keyword3] = keywords.splice(0, 3)

  return (
    <div>
      <div className="grid grid-cols-3 gap-8">
        <KeywordCard keyword={keyword1} />
        <KeywordCard keyword={keyword2} />
        <KeywordCard keyword={keyword3} />
      </div>
      {/* pb-1 to align with CharacterGear */}
      <div className="mt-8 pb-1 space-y-2 bg-white border rounded">
        {keywords
        .filter((_keyword, i) => i < 12)
        .map(keyword => (
          <KeywordListItem
            key={keyword.name}
            keyword={keyword}
          />
        ))}
      </div>
    </div>
  )
}

export default CharacterKeywords
