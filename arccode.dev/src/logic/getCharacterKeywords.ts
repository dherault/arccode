import keywordThresholds from 'arccode-keyword-thresholds'

import type { Character, Keyword } from '~types'

function getCharacterKeywords(character: Character): Keyword[] {
  return Object.entries(character.keywords)
    .map(([language, keywords]) => Object.entries(keywords).map(([name, count]) => {
      // @ts-expect-error
      const thresholds = (keywordThresholds[language]?.[name] ?? [1]) as number[]

      let thresholdMax = thresholds.find(x => x > count) ?? Math.ceil(count / thresholds[thresholds.length - 1]) * thresholds[thresholds.length - 1]

      if (count >= thresholdMax) {
        thresholdMax += thresholds[thresholds.length - 1]
      }

      const thresholdMin = [...thresholds].reverse().find(x => x < thresholdMax) ?? 0

      return {
        language,
        name,
        count,
        thresholdMin,
        thresholdMax,
      }
    }))
    .flat()
    .sort((a, b) => a.thresholdMax - a.count - b.thresholdMax + b.count)
}

export default getCharacterKeywords
