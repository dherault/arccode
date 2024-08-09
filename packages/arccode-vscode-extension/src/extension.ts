import * as vscode from 'vscode'

import type { FileRegistry } from './types'
import { AUTHENTICATION_TYPE } from './constants'
import ArccodeAuthenticationProvider from './ArccodeAuthenticationProvider'
import KeywordRegistry from './KeywordRegistry'
import { handleDocumentChange, populateFileRegistry } from './core'
import getSession from './getSession'
import printProgress from './printProgress'

export function activate(context: vscode.ExtensionContext) {
  if (process.env.DEV) {
    vscode.window.showInformationMessage('Arccode dev mode loaded')
  }

  /* ---
    Authentication
  --- */

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.signIn', async () => {
      getSession(true)
    })
  )

  context.subscriptions.push(new ArccodeAuthenticationProvider(context))

  context.subscriptions.push(
    vscode.authentication.onDidChangeSessions(async event => {
      if (event.provider.id !== AUTHENTICATION_TYPE) return

      getSession()
    })
  )

  getSession()

  /* ---
    Keywords
  --- */

  const fileRegistry: FileRegistry = {}
  const keywordRegistry = new KeywordRegistry()

  vscode.workspace.textDocuments.forEach(document => populateFileRegistry(document, fileRegistry))
  vscode.workspace.onDidOpenTextDocument(document => populateFileRegistry(document, fileRegistry))
  vscode.workspace.onDidChangeTextDocument(event => handleDocumentChange(event.document, fileRegistry, keywordRegistry))

  /* ---
   Print progress
   ---*/

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.print', async () => {
      await printProgress(keywordRegistry)
    })
  )
}

export function deactivate() {}
