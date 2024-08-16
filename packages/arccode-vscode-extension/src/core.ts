import * as vscode from 'vscode'
import { diffArray } from 'array-differences'

import type { Language } from './types'
import { MAX_LINES } from './constants'
import languageToKeywords from './languageToKeywords'
import type FileRegistry from './FileRegistry'
import type KeywordRegistry from './KeywordRegistry'

const supportedLanguageIds = Object.keys(languageToKeywords)

export function populateFileRegistry(document: vscode.TextDocument, fileRegistry: FileRegistry) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  fileRegistry.registerFile(document.uri.toString(), document.getText())
}

export function handleDocumentChange(document: vscode.TextDocument, fileRegistry: FileRegistry, keywordRegistry: KeywordRegistry) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  const language = document.languageId as Language
  const editorUri = document.uri.toString()
  const latestLines = fileRegistry.getLines(editorUri)
  const currentText = document.getText()
  const currentLines = currentText.split('\n')

  fileRegistry.registerFile(editorUri, currentText)

  if (latestLines.length > MAX_LINES || currentLines.length > MAX_LINES) return

  diffArray(latestLines, currentLines).forEach(lineDiff => {
    const [lineOperation, lineIndex, lineValue] = lineDiff

    if (lineOperation === 'deleted') {
      extractKeywords(language, latestLines[lineIndex] ?? '').forEach(keyword => {
        keywordRegistry.registerKeyword(language, keyword, -1)
      })

      return
    }

    // Ignore duplicated lines
    const otherLines = [...currentLines]

    otherLines.splice(lineIndex, 1)

    if (otherLines.some(l => l === lineValue)) return

    if (lineOperation === 'inserted') {
      extractKeywords(lineValue, language).forEach(keyword => {
        keywordRegistry.registerKeyword(language, keyword, 1)
      })

      return
    }

    // Here operation === 'modified'
    const previousKeywords = extractKeywords(language, latestLines[lineIndex])
    const nextKeywords = extractKeywords(language, lineValue)

    diffArray(previousKeywords, nextKeywords).forEach(keywordDiff => {
      const [keywordOperation, keywordIndex, keywordValue] = keywordDiff

      if (keywordOperation === 'deleted') keywordRegistry.registerKeyword(language, previousKeywords[keywordIndex], -1)
      else if (keywordOperation === 'inserted') keywordRegistry.registerKeyword(language, keywordValue, 1)
      else {
        keywordRegistry.registerKeyword(language, previousKeywords[keywordIndex], -1)
        keywordRegistry.registerKeyword(language, keywordValue, 1)
      }
    })
  })
}

const formatWordRegex = /[^a-zA-Z0-9-_]/g

function extractKeywords(language: Language, line: string) {
  const keywords = languageToKeywords[language]

  if (!keywords) return []

  return line
    .split(' ')
    .map(word => word.replace(formatWordRegex, ''))
    .filter(word => keywords.includes(word))
}
