import * as keywords from './index'

const keywordRegex = /^[a-zA-Z][a-zA-Z0-9-_]*$/

describe('language-keywords', () => {
  test('are valid keywords', () => {
    Object.entries(keywords).forEach(([language, keywords]) => {
      keywords.forEach(keyword => {
        const isValid = keywordRegex.test(keyword)

        if (!isValid) console.log(language, keyword)

        expect(isValid).toBe(true)
      })
    })
  })
})
