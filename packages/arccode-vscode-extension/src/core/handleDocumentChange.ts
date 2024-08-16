import * as vscode from 'vscode'
import { diffArray } from 'array-differences'

import type { Language } from '../types'
import { MAX_LINES } from '../constants'
import type FileRegistry from '../model/FileRegistry'
import type KeywordRegistry from '../model/KeywordRegistry'

import { supportedLanguageIds } from './languages'
import extractKeywords from './extractKeywords'

function handleDocumentChange(document: vscode.TextDocument, fileRegistry: FileRegistry, keywordRegistry: KeywordRegistry) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  const language = document.languageId as Language
  const editorUri = document.uri.toString()
  const previousLines = fileRegistry.getLines(editorUri)
  const currentText = document.getText()
  const currentLines = currentText.split('\n')

  fileRegistry.registerFile(editorUri, currentText)

  if (previousLines.length > MAX_LINES || currentLines.length > MAX_LINES) return

  diffArray(previousLines, currentLines).forEach(lineDiff => {
    const [lineOperation, lineIndex, lineValue] = lineDiff

    if (lineOperation === 'deleted') {
      extractKeywords(language, previousLines[lineIndex] ?? '').forEach(keyword => {
        keywordRegistry.registerKeyword(language, keyword, -1)
      })

      return
    }

    if (lineOperation === 'inserted') {
      extractKeywords(language, lineValue).forEach(keyword => {
        keywordRegistry.registerKeyword(language, keyword, 1)
      })

      return
    }

    // Here operation === 'modified'
    const previousKeywords = extractKeywords(language, previousLines[lineIndex])
    const nextKeywords = extractKeywords(language, lineValue)

    diffArray(previousKeywords, nextKeywords).forEach(keywordDiff => {
      const [keywordOperation, keywordIndex, keywordValue] = keywordDiff

      if (keywordOperation === 'deleted') {
        keywordRegistry.registerKeyword(language, previousKeywords[keywordIndex], -1)
      }
      else if (keywordOperation === 'inserted') {
        keywordRegistry.registerKeyword(language, keywordValue, 1)
      }
      else {
        keywordRegistry.registerKeyword(language, previousKeywords[keywordIndex], -1)
        keywordRegistry.registerKeyword(language, keywordValue, 1)
      }
    })
  })
}

export default handleDocumentChange
