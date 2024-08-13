import keywordThresholds from 'arccode-keyword-thresholds'

import type { Keyword } from '~types'

type Props = {
  keyword: Keyword
}

function KeywordProgress({ keyword }: Props) {
  // @ts-expect-error
  const thresholds = keywordThresholds[keyword.language]?.[keyword.name] as number[]

  if (!thresholds) return null

  const thresholdTop = thresholds.find(x => x > keyword.count) ?? Math.ceil(keyword.count / thresholds[thresholds.length - 1]) * thresholds[thresholds.length - 1]

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 grow flex bg-neutral-200 rounded-sm overflow-hidden">
        <div
          className="bg-blue"
          style={{
            width: `${100 * keyword.count / thresholdTop}%`,
          }}
        />
      </div>
      <div className="font-mono">
        {thresholdTop}
      </div>
    </div>
  )
}

export default KeywordProgress
