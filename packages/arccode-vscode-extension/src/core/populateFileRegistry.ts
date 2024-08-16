import * as vscode from 'vscode'

import type FileRegistry from '../model/FileRegistry'

import { supportedLanguageIds } from './languages'

function populateFileRegistry(document: vscode.TextDocument, fileRegistry: FileRegistry) {
  if (!supportedLanguageIds.includes(document.languageId)) return

  fileRegistry.registerFile(document.uri.toString(), document.getText())
}

export default populateFileRegistry
