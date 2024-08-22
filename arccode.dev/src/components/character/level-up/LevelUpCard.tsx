import useCharacter from '~hooks/character/useCharacter'

import SlidingBanner from '~components/common/SlidingBanner'
import LanguageImage from '~components/character/keywords/LanguageImage'

function LevelUpCard() {
  const { character, openLevelUp } = useCharacter()

  const keywordNodes = Object.entries(character.levelUpKeywordRegistry).map(([language, keywords]) => (
    Object.entries(keywords)
    .filter(([, count]) => count > 0)
    .map(([keyword, count]) => (
      <div
        key={language + keyword}
        className="shrink-0 text-neutral-400 text-xs flex items-center gap-1.5"
      >
        <LanguageImage
          language={language}
          className="w-3 opacity-75"
        />
        <div className="font-mono">
          {keyword}
        </div>
        {count > 1 && (
          <div className="py-0.5 px-1 bg-neutral-50 border rounded-full text-[0.5rem] leading-none">
            x
            {count}
          </div>
        )}
      </div>
    ))
  )).flat()

  return (
    <div
      onClick={openLevelUp}
      className="py-3 flex flex-col items-center justify-center bg-white border border-blue rounded cursor-pointer"
    >
      <div className="mt-1 text-blue animate-bounce">
        Level up!
      </div>
      <div className="grow" />
      <SlidingBanner
        duration={Math.max(12, keywordNodes.length * 1.666)}
        gap={12}
      >
        {keywordNodes}
      </SlidingBanner>
    </div>
  )
}

export default LevelUpCard
