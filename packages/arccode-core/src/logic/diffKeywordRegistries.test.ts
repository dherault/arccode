import type { KeywordRegistry } from '../types'

import diffKeywordRegistries from './diffKeywordRegistries'

describe('diffKeywordRegistries', () => {
  test('diff keyword registries', () => {
    const a: KeywordRegistry = {
      javascript: {
        const: 1,
        function: 3,
      },
      ruby: {
        def: 4,
      },
    }
    const b: KeywordRegistry = {
      javascript: {
        const: 1,
        function: 1,
      },
      ruby: {
        end: 1,
      },
    }
    const output: KeywordRegistry = {
      javascript: {
        const: 0,
        function: 2,
      },
      ruby: {
        def: 4,
        end: -1,
      },
    }

    expect(diffKeywordRegistries(a, b)).toEqual(output)
  })
})
