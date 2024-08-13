import type { Keyword } from '~types'

import languages from '~data/languages'

type Props = {
  keyword: Keyword
}

function KeywordCard({ keyword }: Props) {
  const languageData = languages[keyword.language]

  return (
    <div className="p-4 bg-white border rounded">
      <div className="flex flex-wrap items-center gap-4">
        <img
          src={`/images/languages/${languageData.image}`}
          alt={languageData.name}
          draggable={false}
          className="w-4 select-none"
        />
        <div className="font-mono grow">
          {keyword.name}
        </div>
        <div>
          {keyword.count}
        </div>
      </div>
    </div>
  )
}

export default KeywordCard
