
import { getKeywords } from 'arccode-core'

import useCharacter from '~hooks/character/useCharacter'
import useBreakpoint from '~hooks/common/useBreakpoint'

import KeywordCard from '~components/character/KeywordCard'
import KeywordListItem from '~components/character/KeywordListItem'
import LevelUpCard from '~components/character/LevelUpCard'
import CharacterEmpty from '~components/character/CharacterEmpty'

const breakpointToKeywordsCount = {
  sm: 6,
  md: 12,
  lg: 14,
  xl: 14,
  '2xl': 30,
}

function CharacterKeywords() {
  const { character, isEditable, levelUpCount: levelUpsCount } = useCharacter()
  const breakpoint = useBreakpoint()

  const keywords = getKeywords(character.keywordRegistry)
  const maxKeywords = breakpointToKeywordsCount[breakpoint] ?? breakpointToKeywordsCount.lg

  const [
    keyword1,
    keyword2,
    keyword3,
    keyword4,
    keyword5,
    keyword6,
  ] = keywords.splice(0, isEditable && levelUpsCount > 0 ? 5 : 6)

  const listedKeywords = keywords
    .sort((a, b) => b.count - a.count)
    .filter((_keyword, i) => i < maxKeywords)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {isEditable && levelUpsCount > 0 && <LevelUpCard />}
        {keyword1 && <KeywordCard keyword={keyword1} />}
        {keyword2 && <KeywordCard keyword={keyword2} />}
        {keyword3 && <KeywordCard keyword={keyword3} />}
        {keyword4 && <KeywordCard keyword={keyword4} />}
        {keyword5 && <KeywordCard keyword={keyword5} />}
        {keyword6 && <KeywordCard keyword={keyword6} />}
      </div>
      {!!listedKeywords.length && (
        <div className="my-4 bg-white border rounded grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row">
          {listedKeywords.map(keyword => (
            <KeywordListItem
              key={keyword.language + keyword.name}
              keyword={keyword}
            />
          ))}
        </div>
      )}
      {!keyword1 && isEditable && (
        <CharacterEmpty />
      )}
    </>
  )
}

export default CharacterKeywords
