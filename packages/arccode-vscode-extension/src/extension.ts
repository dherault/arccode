import * as vscode from 'vscode'

import type { Registry } from './types'
import { handleDocumentChange, populateRegistry } from './handlers'
import ArccodeAuthenticationProvider, { AUTH_TYPE } from './ArccodeAuthenticationProvider'

export function activate(context: vscode.ExtensionContext) {
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

  const registry: Registry = {}

  vscode.workspace.textDocuments.forEach(document => populateRegistry(registry, document))
  vscode.workspace.onDidOpenTextDocument(document => populateRegistry(registry, document))
  vscode.workspace.onDidChangeTextDocument(event => handleDocumentChange(registry, event.document))
}

export function deactivate() {}

async function getSession() {
  const session = await vscode.authentication.getSession(AUTH_TYPE, [], { createIfNone: false })

  if (!session) return

  vscode.window.showInformationMessage(`Arccode: logged in as ${session.account.label}`)
}
