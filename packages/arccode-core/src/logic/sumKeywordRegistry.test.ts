import type { KeywordRegistry } from '../types'

import sumKeywordRegistry from './sumKeywordRegistry'

describe('sumKeywordRegistry', () => {
  test('counts keyword registry', () => {
    const input: KeywordRegistry = {
      javascript: {
        const: 1,
        function: 3,
      },
    }

    expect(sumKeywordRegistry(input)).toEqual(4)
  })
})
