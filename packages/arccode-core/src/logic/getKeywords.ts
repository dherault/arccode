import keywordThresholds from 'arccode-keyword-thresholds'

import type { Keyword, KeywordRegistry } from '../types'

function getKeywords(keywordRegistry: KeywordRegistry): Keyword[] {
  return Object.entries(keywordRegistry)
    .map(([language, keywords]) => Object.entries(keywords).map(([name, count]) => {
      // @ts-expect-error
      const thresholds = (keywordThresholds[language]?.[name] ?? [1]) as number[]

      const lastThreshold = thresholds[thresholds.length - 1]
      let thresholdMax = thresholds.find(x => x > count) ?? Math.ceil(count / lastThreshold) * lastThreshold

      if (count >= thresholdMax) {
        thresholdMax += lastThreshold
      }

      const thresholdMin = [...thresholds].reverse().find(x => x < thresholdMax) ?? 0

      let levelCount = 0
      let level = 0

      for (let i = 0; i < thresholds.length; i++) {
        levelCount += thresholds[i]

        if (count >= thresholds[i]) level++
      }

      for (let i = levelCount; i < count; i += lastThreshold) {
        level++
      }

      return {
        language,
        name,
        count,
        level,
        thresholdMin,
        thresholdMax,
      }
    }))
    .flat()
    .filter(x => x.count > 0)
    .sort((a, b) => {
      const diff = a.thresholdMax - a.count - (b.thresholdMax - b.count)

      if (diff) return diff

      return a.name.localeCompare(b.name)
    })
}

export default getKeywords
