import type { KeywordRegistry } from '../types'

function countKeywordRegistry(keywordRegistry: KeywordRegistry) {
  let count = 0

  Object.values(keywordRegistry).forEach(keywords => {
    Object.values(keywords).forEach(amount => {
      count += amount
    })
  })

  return count
}

export default countKeywordRegistry
