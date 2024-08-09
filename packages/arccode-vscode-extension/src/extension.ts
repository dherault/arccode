import * as vscode from 'vscode'

import type { FileRegistry, KeywordRegistry } from './types'
import { AUTH_TYPE } from './constants'
import ArccodeAuthenticationProvider from './ArccodeAuthenticationProvider'
import { handleDocumentChange, populateFileRegistry } from './handlers'

export function activate(context: vscode.ExtensionContext) {
  /* ---
    Authentication
  --- */

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.signIn', async () => {
      const session = await vscode.authentication.getSession(AUTH_TYPE, [], { createIfNone: true })
      console.log(session)
    })
  )

  context.subscriptions.push(new ArccodeAuthenticationProvider(context))

  context.subscriptions.push(
    vscode.authentication.onDidChangeSessions(async e => {
      if (e.provider.id !== AUTH_TYPE) return

      getSession()
    })
  )

  getSession()

  /* ---
    Keywords
  --- */

  const fileRegistry: FileRegistry = {}
  const keywordRegistry: KeywordRegistry = {}

  vscode.workspace.textDocuments.forEach(document => populateFileRegistry(document, fileRegistry))
  vscode.workspace.onDidOpenTextDocument(document => populateFileRegistry(document, fileRegistry))
  vscode.workspace.onDidChangeTextDocument(event => handleDocumentChange(event.document, fileRegistry, keywordRegistry))
}

export function deactivate() {}

async function getSession() {
  const session = await vscode.authentication.getSession(AUTH_TYPE, [], { createIfNone: false })

  if (!session) return

  vscode.window.showInformationMessage(`Arccode: logged in as ${session.account.label}`)
}
