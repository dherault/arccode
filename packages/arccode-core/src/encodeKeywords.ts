import type { KeywordRegistry } from './types'

const ENCODING_PREFIX = '@'

function encodeKeyword(keyword: string) {
  return ENCODING_PREFIX + keyword
}

function decodeKeyword(keyword: string) {
  return keyword.slice(ENCODING_PREFIX.length)
}

export function encodeKeywords(keywords: KeywordRegistry) {
  return Object.fromEntries(
    Object.entries(keywords).map(([language, keywordMap]) => [
      language,
      Object.fromEntries(
        Object.entries(keywordMap).map(([keyword, amount]) => [encodeKeyword(keyword), amount])
      ),
    ])
  )
}

export function decodeKeywords(keywords: KeywordRegistry) {
  return Object.fromEntries(
    Object.entries(keywords).map(([language, keywordMap]) => [
      language,
      Object.fromEntries(
        Object.entries(keywordMap).map(([keyword, amount]) => [decodeKeyword(keyword), amount])
      ),
    ])
  )
}
