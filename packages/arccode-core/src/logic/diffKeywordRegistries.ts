import cloneDeep from 'lodash.clonedeep'

import type { KeywordRegistry } from '../types'

function diffKeywordRegistries(a: KeywordRegistry, b: KeywordRegistry) {
  const output: KeywordRegistry = cloneDeep(a)

  Object.entries(b).forEach(([language, keywordMap]) => {
    if (!output[language]) output[language] = {}

    Object.entries(keywordMap).forEach(([keyword, amount]) => {
      if (!output[language][keyword]) output[language][keyword] = 0

      output[language][keyword] -= amount
    })
  })

  return output
}

export default diffKeywordRegistries
