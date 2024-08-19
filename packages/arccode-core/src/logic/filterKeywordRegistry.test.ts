import type { KeywordRegistry } from '../types'

import filterKeywordRegistry from './filterKeywordRegistry'

describe('filterKeywordRegistry', () => {
  test('diff keyword registries', () => {
    const input: KeywordRegistry = {
      javascript: {
        const: -1,
        function: 3,
      },
      ruby: {
        def: 0,
      },
    }
    const output: KeywordRegistry = {
      javascript: {
        function: 3,
      },
    }

    expect(filterKeywordRegistry(input)).toEqual(output)
  })
})
