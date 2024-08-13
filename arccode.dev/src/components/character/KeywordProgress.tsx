
import type { Keyword } from '~types'

type Props = {
  keyword: Keyword
}

function KeywordProgress({ keyword }: Props) {
  return (
    <div className="">
      <div className="h-2 grow flex bg-neutral-200 rounded-sm overflow-hidden">
        <div
          className="bg-blue"
          style={{
            width: `${100 * (keyword.count - keyword.thresholdMin) / keyword.thresholdMax}%`,
          }}
        />
      </div>
      <div className="mt-1 text-xs text-right text-neutral-400">
        {keyword.thresholdMax - keyword.count}
        {' '}
        to level up!
      </div>
    </div>
  )
}

export default KeywordProgress
