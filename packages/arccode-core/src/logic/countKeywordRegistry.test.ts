import type { KeywordRegistry } from '../types'

import countKeywordRegistry from './countKeywordRegistry'

describe('countKeywordRegistry', () => {
  test('counts keyword registry', () => {
    const input: KeywordRegistry = {
      javascript: {
        const: 1,
        function: 3,
      },
    }

    expect(countKeywordRegistry(input)).toEqual(4)
  })
})
