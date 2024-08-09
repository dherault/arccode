import * as vscode from 'vscode'

import type { FileRegistry } from './types'
import { AUTH_TYPE } from './constants'
import ArccodeAuthenticationProvider from './ArccodeAuthenticationProvider'
import { handleDocumentChange, populateFileRegistry } from './handlers'
import printProgress from './printProgress'
import KeywordRegistry from './KeywordRegistry'

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('Arccode!')

  /* ---
    Authentication
  --- */

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.signIn', async () => {
      await vscode.authentication.getSession(AUTH_TYPE, [], { createIfNone: true })
    })
  )

  context.subscriptions.push(new ArccodeAuthenticationProvider(context))

  context.subscriptions.push(
    vscode.authentication.onDidChangeSessions(async event => {
      if (event.provider.id !== AUTH_TYPE) return

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

async function getSession() {
  const session = await vscode.authentication.getSession(AUTH_TYPE, [], { createIfNone: false })

  if (!session) return

  vscode.window.showInformationMessage(`Arccode: logged in as ${session.account.label}`)
}
