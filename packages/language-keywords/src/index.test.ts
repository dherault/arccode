import * as keywords from './index'

const keyordRegex = /[a-z]/

describe('language-keywords', () => {
  test('are valid keywords', () => {
    Object.entries(keywords).forEach(([language, keywords]) => {
      keywords.forEach(keyword => {
        const isValid = keyordRegex.test(keyword)

        if (!isValid) console.log(language, keyword)

        expect(isValid).toBe(true)
      })
    })
  })
})
