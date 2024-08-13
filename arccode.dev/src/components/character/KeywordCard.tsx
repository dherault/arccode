import type { Keyword } from '~types'

import languages from '~data/languages'

type Props = {
  keyword: Keyword
}

function KeywordCard({ keyword }: Props) {
  const languageData = languages[keyword.language]

  return (
    <div className="p-4 bg-white border rounded">
      <div className="flex items-center gap-4">
        <img
          src={`/images/languages/${languageData.image}`}
          alt={languageData.name}
          className="w-4"
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
