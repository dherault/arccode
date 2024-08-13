import type { Keyword } from '~types'

import languages from '~data/languages'

type Props = {
  keyword: Keyword
}

function KeywordListItem({ keyword }: Props) {
  const languageData = languages[keyword.language]

  return (
    <div className="py-2 px-4">
      <div className="flex flex-wrap items-center gap-4">
        <img
          src={`/images/languages/${languageData.image}`}
          alt={languageData.name}
          draggable={false}
          className="w-4 select-none"
        />
        <div className="font-mono w-32">
          {keyword.name}
        </div>
        <div className="font-mono w-8 text-right">
          {keyword.count}
        </div>
        {/* <div className="grow">
          <KeywordProgress keyword={keyword} />
        </div> */}
      </div>
    </div>
  )
}

export default KeywordListItem
