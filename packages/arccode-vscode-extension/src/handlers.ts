import * as vscode from 'vscode'
import diffArray from 'array-differences'

import type { FileRegistry, KeywordRegistry, Language } from './types'
import languageToKeywords from './keywords'
import { MAX_LINES } from './constants'

const supportedLanguageIds = Object.keys(languageToKeywords)

export function populateFileRegistry(document: vscode.TextDocument, fileRegistry: FileRegistry) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  const currentText = document.getText()
  const currentLines = currentText.split('\n')

  if (currentLines.length > MAX_LINES) return

  fileRegistry[document.uri.toString()] = currentText
}

export function handleDocumentChange(document: vscode.TextDocument, fileRegistry: FileRegistry, keywordRegistry: KeywordRegistry) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  const language = document.languageId as Language
  const editorUri = document.uri.toString()
  const previousLines = (fileRegistry[editorUri] ?? '').split('\n')
  const currentText = document.getText()
  const currentLines = currentText.split('\n')

  fileRegistry[editorUri] = currentText

  if (previousLines.length > MAX_LINES || currentLines.length > MAX_LINES) return

  diffArray(previousLines, currentLines).forEach(lineDiff => {
    if (lineDiff[0] === 'deleted') {
      extractKeywords(previousLines[lineDiff[1]] ?? '', language).forEach(keyword => {
        registerKeyword(keyword, -1)
      })
    }

    const otherLines = [...currentLines]

    otherLines.splice(lineDiff[1], 1)

    if (otherLines.some(l => l === lineDiff[2])) return

    if (lineDiff[0] === 'inserted') {
      extractKeywords(lineDiff[2], language).forEach(keyword => {
        registerKeyword(keyword)
      })
    }

    // Here lineDiff[0] === 'modified'
    const previousKeywords = extractKeywords(previousLines[lineDiff[1]], language)
    const nextKeywords = extractKeywords(lineDiff[2], language)
    const addedKeywords = new Set([...nextKeywords].filter(keyword => !previousKeywords.has(keyword)))

    addedKeywords.forEach(keyword => {
      registerKeyword(keyword)
    })
  })

  function registerKeyword(keyword: string, delta = 1) {
    if (!keywordRegistry[language]) keywordRegistry[language] = {}
    if (!keywordRegistry[language][keyword]) keywordRegistry[language][keyword] = 0

    keywordRegistry[language][keyword] = Math.max(0, keywordRegistry[language][keyword] + delta)
  }
}

function extractKeywords(line: string, language: Language) {
  const foundKeywords = new Set<string>()
  const keywords = languageToKeywords[language]

  if (!keywords) return foundKeywords

  const words = line.split(' ')

  words.filter(word => keywords.includes(word as any)).forEach(word => foundKeywords.add(word))

  return foundKeywords
}
