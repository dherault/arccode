import * as vscode from 'vscode'

import type FileRegistry from '../model/FileRegistry'

import { supportedLanguageIds } from './languages'

function handleDocumentClose(document: vscode.TextDocument, fileRegistry: FileRegistry) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  fileRegistry.unregisterFile(document.uri.toString())
}

export default handleDocumentClose
