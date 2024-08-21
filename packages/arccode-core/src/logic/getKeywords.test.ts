import type { Keyword, KeywordRegistry } from '../types'

import getKeywords from './getKeywords'

describe('getKeywords', () => {
  test('gets keywords', () => {
    const input: KeywordRegistry = {
      javascript: {
        const: 1,
        function: 5,
      },
    }
    const output: Keyword[] = [
      {
        name: 'const',
        language: 'javascript',
        count: 1,
        level: 0,
        thresholdMax: 4,
        thresholdMin: 0,
      },
      {
        name: 'function',
        language: 'javascript',
        count: 5,
        level: 1,
        thresholdMax: 16,
        thresholdMin: 4,
      },
    ]

    expect(getKeywords(input)).toEqual(output)
  })
})
