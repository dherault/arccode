import extractKeywords from './extractKeywords'

describe('extractKeywords', () => {
  test('extracts keywords 1', () => {
    const keywords = ['const', 'function']
    const input = 'const foo = "bar"'
    const output = ['const']

    expect(extractKeywords(keywords, input)).toEqual(output)
  })

  test('extracts keywords 2', () => {
    const keywords = ['true', 'function']
    const input = 'setData(true)'
    const output = ['true']

    expect(extractKeywords(keywords, input)).toEqual(output)
  })

  test('extracts keywords 3', () => {
    const keywords = ['let', 'function']
    const input = 'let a; let b'
    const output = ['let', 'let']

    expect(extractKeywords(keywords, input)).toEqual(output)
  })
})
