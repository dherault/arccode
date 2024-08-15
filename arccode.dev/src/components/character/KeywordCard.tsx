import type { Keyword } from '~types'

import KeywordProgress from '~components/character/KeywordProgress'
import LanguageImage from '~components/character/LanguageImage'

type Props = {
  keyword: Keyword
}

function KeywordCard({ keyword }: Props) {

  return (
    <div className="py-3 px-4 bg-white border rounded">
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <LanguageImage
          language={keyword.language}
          className="w-4"
        />
        <div className="font-mono grow">
          {keyword.name}
        </div>
        <div className="font-mono">
          {keyword.count}
        </div>
      </div>
      <KeywordProgress keyword={keyword} />
    </div>
  )
}

export default KeywordCard
