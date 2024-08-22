import type { KeywordRegistry } from '../types'

function filterKeywordRegistry(keywordRegistry: KeywordRegistry): KeywordRegistry {
  return Object.fromEntries(
    Object.entries(keywordRegistry)
      .map(([language, keywords]) => [
        language,
        Object.fromEntries(
          Object.entries(keywords!)
          .filter(([, count]) => count > 0)
        ),
      ])
      .filter(([, keywords]) => Object.keys(keywords).length)
  )
}

export default filterKeywordRegistry
