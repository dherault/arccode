import type { Keyword } from '~types'

import languages from '~data/languages'

type Props = {
  keyword: Keyword
}

function KeywordListItem({ keyword }: Props) {
  const languageData = languages[keyword.language]

  return (
    <div className="py-2 px-4">
      <div className="flex items-center gap-4">
        <img
          src={`/images/languages/${languageData.image}`}
          alt={languageData.name}
          className="w-4"
        />
        <div className="font-mono w-32">
          {keyword.name}
        </div>
        <div>
          {keyword.count}
        </div>
      </div>
    </div>
  )
}

export default KeywordListItem
