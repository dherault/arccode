import type { Keyword, KeywordRegistry } from './types'
import getCharacterKeywords from './getCharacterKeywords'

describe('getCharacterKeywords', () => {
  test('gets keywords', () => {
    const input: KeywordRegistry = {
      javascript: {
        const: 1,
        function: 3,
      },
    }
    const output: Keyword[] = [
      {
        name: 'const',
        language: 'javascript',
        count: 1,
        level: 0,
        thresholdMax: 3,
        thresholdMin: 0,
      },
      {
        name: 'function',
        language: 'javascript',
        count: 3,
        level: 1,
        thresholdMax: 12,
        thresholdMin: 3,
      },
    ]

    expect(getCharacterKeywords(input)).toEqual(output)
  })
})
