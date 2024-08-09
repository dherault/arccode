import * as vscode from 'vscode'
import diffArray from 'array-differences'

import type { Registry } from './types'
import languageToKeywords from './keywords'
import { MAX_LINES } from './constants'

const supportedLanguageIds = Object.keys(languageToKeywords)

export function populateRegistry(registry: Registry, document: vscode.TextDocument) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  const currentText = document.getText()
  const currentLines = currentText.split('\n')

  if (currentLines.length > MAX_LINES) return

  registry[document.uri.toString()] = currentText
}

export function handleDocumentChange(registry: Registry, document: vscode.TextDocument) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  const editorUri = document.uri.toString()
  const previousLines = (registry[editorUri] ?? '').split('\n')
  const currentText = document.getText()
  const currentLines = currentText.split('\n')

  registry[editorUri] = currentText

  if (previousLines.length > MAX_LINES || currentLines.length > MAX_LINES) return

  diffArray(previousLines, currentLines).forEach(lineDiff => {
    if (lineDiff[0] === 'deleted') return

    const otherLines = [...currentLines]

    otherLines.splice(lineDiff[1], 1)

    if (otherLines.some(l => l === lineDiff[2])) return

    if (lineDiff[0] === 'inserted') {
      extractKeywords(lineDiff[2], document.languageId).forEach(keyword => {
        vscode.window.showInformationMessage(keyword)
      })
    }

    // Here lineDiff[0] === 'modified'
    const previousKeywords = extractKeywords(previousLines[lineDiff[1]], document.languageId)
    const nextKeywords = extractKeywords(lineDiff[2], document.languageId)
    const addedKeywords = new Set([...nextKeywords].filter(keyword => !previousKeywords.has(keyword)))

    addedKeywords.forEach(keyword => {
      vscode.window.showInformationMessage(keyword)
    })
  })
}

function extractKeywords(line: string, language: string) {
  const foundKeywords = new Set<string>()
  const keywords = languageToKeywords[language as keyof typeof languageToKeywords]

  if (!keywords) return foundKeywords

  const words = line.split(' ')

  words.filter(word => keywords.includes(word as any)).forEach(word => foundKeywords.add(word))

  return foundKeywords
}
