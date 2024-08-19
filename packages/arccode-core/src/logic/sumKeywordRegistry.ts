import type { KeywordRegistry } from '../types'

function sumKeywordRegistry(keywordRegistry: KeywordRegistry) {
  let sum = 0

  Object.values(keywordRegistry).forEach(keywords => {
    Object.values(keywords).forEach(amount => {
      sum += amount
    })
  })

  return sum
}

export default sumKeywordRegistry
