import type { Keyword } from '~types'

import LanguageImage from '~components/character/keywords/LanguageImage'

type Props = {
  keyword: Keyword
}

function KeywordListItem({ keyword }: Props) {

  return (
    <div className="py-2 px-4">
      <div className="flex flex-wrap items-center gap-4">
        <LanguageImage
          language={keyword.language}
          className="w-4"
        />
        <div className="font-mono">
          {keyword.name}
        </div>
        <div className="font-mono grow text-right">
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
