import type { Language } from '../types'

import { languageToKeywords } from './languages'

const formatWordRegex = /[^a-zA-Z0-9-_]/g

function extractKeywords(language: Language, line: string) {
  const keywords = languageToKeywords[language as keyof typeof languageToKeywords]

  if (!keywords) return []

  const words = line.split(' ')

  words.pop() // Eg: prevent registering `char` if typing `character`

  return words
    .map(word => word.replace(formatWordRegex, ''))
    .filter(word => keywords.includes(word))
}

export default extractKeywords
