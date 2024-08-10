import * as vscode from 'vscode'

import type { FileRegistry } from './types'
import { AUTHENTICATION_TYPE, SYNC_PERIOD } from './constants'
import ArccodeAuthenticationProvider from './ArccodeAuthenticationProvider'
import KeywordRegistry from './KeywordRegistry'
import { handleDocumentChange, populateFileRegistry } from './core'
import { getSession, promptSession } from './session'
import printProgress from './printProgress'
import { sync } from './api'

let syncInterval: NodeJS.Timeout | undefined

export function activate(context: vscode.ExtensionContext) {
  if (process.env.DEV) {
    vscode.window.showInformationMessage('Arccode dev mode loaded')
  }

  /* ---
    Authentication
  --- */

  const authenticationProvider = new ArccodeAuthenticationProvider(context)

  context.subscriptions.push(authenticationProvider)

  context.subscriptions.push(
    vscode.authentication.onDidChangeSessions(async event => {
      if (event.provider.id !== AUTHENTICATION_TYPE) return

      getSession()
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.signIn', async () => {
      getSession(true)
    })
  )

  getSession()
  promptSession()

  /* ---
    Keywords
  --- */

  const fileRegistry: FileRegistry = {}
  const keywordRegistry = new KeywordRegistry()

  vscode.workspace.textDocuments.forEach(document => populateFileRegistry(document, fileRegistry))
  vscode.workspace.onDidOpenTextDocument(document => populateFileRegistry(document, fileRegistry))
  vscode.workspace.onDidChangeTextDocument(event => handleDocumentChange(event.document, fileRegistry, keywordRegistry))

  /* ---
    Sync
  ---*/

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.sync', async () => {
      await sync(keywordRegistry)

      vscode.window.showInformationMessage('Arccode sync complete')
    })
  )

  if (syncInterval) clearInterval(syncInterval)

  syncInterval = setInterval(async () => {
    if (Date.now() - keywordRegistry.updatedAt.valueOf() < SYNC_PERIOD) return

    await sync(keywordRegistry)
  }, 1000)

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
