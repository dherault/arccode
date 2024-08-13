import { useMemo } from 'react'

import type { Keyword } from '~types'

import getCharacterKeywords from '~logic/getCharacterKeywords'

import useCharacter from '~hooks/character/useCharacter'

import KeywordCard from '~components/character/KeywordCard'
import KeywordListItem from '~components/character/KeywordListItem'

function CharacterKeywords() {
  const { character } = useCharacter()

  const keywords = useMemo<Keyword[]>(() => getCharacterKeywords(character), [character])

  const [
    keyword1,
    keyword2,
    keyword3,
    keyword4,
    keyword5,
    keyword6,
  ] = keywords.splice(0, 6)

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {keyword1 && <KeywordCard keyword={keyword1} />}
        {keyword2 && <KeywordCard keyword={keyword2} />}
        {keyword3 && <KeywordCard keyword={keyword3} />}
        {keyword4 && <KeywordCard keyword={keyword4} />}
        {keyword5 && <KeywordCard keyword={keyword5} />}
        {keyword6 && <KeywordCard keyword={keyword6} />}
      </div>
      <div className="mt-4 py-0.5 bg-white border rounded">
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
