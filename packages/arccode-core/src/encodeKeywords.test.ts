import type { KeywordRegistry } from './types'
import { decodeKeywords, encodeKeywords } from './encodeKeywords'

describe('encodeKeywords', () => {
  test('encodes and decodes keywords', () => {
    const input: KeywordRegistry = {
      javascript: {
        const: 1,
        function: 3,
      },
    }

    expect(decodeKeywords(encodeKeywords(input))).toEqual(input)
  })
})
