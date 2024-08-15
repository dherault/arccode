import * as vscode from 'vscode'
import diffArray from 'array-differences'

import type { Language } from './types'
import { MAX_LINES } from './constants'
import languageToKeywords from './keywords'
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
  const allLines = fileRegistry.getAllLines(editorUri)
  const latestLines = fileRegistry.getLatestLines(editorUri)
  const currentText = document.getText()
  const currentLines = currentText.split('\n')

  fileRegistry.registerFile(editorUri, currentText)

  if (latestLines.length > MAX_LINES || currentLines.length > MAX_LINES) return

  diffArray(latestLines, currentLines).forEach(lineDiff => {

    const [operation, lineIndex, lineValue] = lineDiff

    // vscode.window.showInformationMessage(JSON.stringify(allLines))

    if (operation === 'deleted') {
      extractKeywords(language, latestLines[lineIndex] ?? '').forEach(keyword => {
        keywordRegistry.registerKeyword(language, keyword, -1)
      })
    }

    // Ignore duplicated lines
    const otherLines = [...currentLines]

    otherLines.splice(lineIndex, 1)

    if (otherLines.some(l => l === lineValue)) return

    if (operation === 'inserted') {
      extractKeywords(lineValue, language).forEach(keyword => {
        keywordRegistry.registerKeyword(language, keyword)
      })
    }

    // Here operation === 'modified'
    // If we stumbled upon this line before, return
    if (allLines[lineIndex].some(line => line === lineValue)) return

    const previousKeywords = extractKeywords(language, latestLines[lineIndex])
    const nextKeywords = extractKeywords(language, lineValue)
    const addedKeywords = new Set([...nextKeywords].filter(keyword => !previousKeywords.has(keyword)))

    addedKeywords.forEach(keyword => {
      keywordRegistry.registerKeyword(language, keyword)
    })
  })
}

const formatWordRegex = /[^a-zA-Z0-9-_]/g

function extractKeywords(language: Language, line: string) {
  const foundKeywords = new Set<string>()
  const keywords = languageToKeywords[language]

  if (!keywords) return foundKeywords

  line
  .split(' ')
  .map(word => word.replace(formatWordRegex, ''))
  .filter(word => keywords.includes(word as any))
  .forEach(word => foundKeywords.add(word))

  return foundKeywords
}
