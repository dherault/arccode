import { useState } from 'react'

import useCharacter from '~hooks/character/useCharacter'

import LevelUpContainer from '~components/character/LevelUpContainer'
import SlidingBanner from '~components/common/SlidingBanner'
import LanguageImage from '~components/character/LanguageImage'

function LevelUpCard() {
  const { character } = useCharacter()

  const [open, setOpen] = useState(false)

  console.log('character', character)

  const keywordNodes = Object.entries(character.levelUpsKeywords).map(([language, keywords]) => (
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
    <>
      <div
        onClick={() => setOpen(true)}
        className="py-3 flex flex-col items-center justify-center bg-white border border-blue rounded cursor-pointer"
      >
        <div className="mt-1 text-blue animate-bounce">
          Level up!
        </div>
        <div className="grow" />
        <SlidingBanner
          duration={Math.max(10, keywordNodes.length * 2)}
          gap={12}
        >
          {keywordNodes}
        </SlidingBanner>
      </div>
      <LevelUpContainer
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default LevelUpCard
