import { useMemo } from 'react'

import type { Keyword } from '~types'

import getCharacterKeywords from '~logic/getCharacterKeywords'
import getLevelUps from '~logic/getLevelUps'

import useCharacter from '~hooks/character/useCharacter'

import KeywordCard from '~components/character/KeywordCard'
import KeywordListItem from '~components/character/KeywordListItem'
import LevelUpCard from '~components/character/LevelUpCard'

function CharacterKeywords() {
  const { character } = useCharacter()

  const keywords = useMemo<Keyword[]>(() => getCharacterKeywords(character.keywords), [character])
  const { count: levelUpCount, keywords: LevelUpKeywords } = useMemo(() => getLevelUps(character), [character])

  const [
    keyword1,
    keyword2,
    keyword3,
    keyword4,
    keyword5,
    keyword6,
  ] = keywords.splice(0, levelUpCount > 0 ? 5 : 6)

  const listedKeywords = keywords.filter((_keyword, i) => i < 11)

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {levelUpCount > 0 && <LevelUpCard keywords={LevelUpKeywords} />}
        {keyword1 && <KeywordCard keyword={keyword1} />}
        {keyword2 && <KeywordCard keyword={keyword2} />}
        {keyword3 && <KeywordCard keyword={keyword3} />}
        {keyword4 && <KeywordCard keyword={keyword4} />}
        {keyword5 && <KeywordCard keyword={keyword5} />}
        {keyword6 && <KeywordCard keyword={keyword6} />}
      </div>
      {!!listedKeywords.length && (
        <div className="mt-4 py-px bg-white border rounded">
          {listedKeywords.map(keyword => (
            <KeywordListItem
              key={keyword.name}
              keyword={keyword}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CharacterKeywords
