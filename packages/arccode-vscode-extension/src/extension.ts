import * as vscode from 'vscode'
import axios from 'axios'

import type { FileRegistry } from './types'
import {
  ACTIVATE_EXTENSION_API_URL,
  AUTHENTICATION_TYPE,
  EXCHANGE_TOKENS_API_URL,
  REGISTER_KEYWORDS_API_URL,
  SYNC_PERIOD,
} from './constants'
import ArccodeAuthenticationProvider from './ArccodeAuthenticationProvider'
import KeywordRegistry from './KeywordRegistry'
import { handleDocumentChange, populateFileRegistry } from './core'

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
      await sync(keywordRegistry, true)
    })
  )

  if (syncInterval) clearInterval(syncInterval)

  syncInterval = setInterval(async () => {
    if (Date.now() - keywordRegistry.updatedAt.valueOf() < SYNC_PERIOD) return

    await sync(keywordRegistry)
  }, 1000 * 60 / 2)

  /* ---
    Activate extension
  ---*/

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.activateExtension', async () => {
      await activateExtension(true)
    })
  )

  /* ---
    Print progress
  ---*/

  context.subscriptions.push(
    vscode.commands.registerCommand('arccode.print', async () => {
      await vscode.window.showInformationMessage(JSON.stringify(keywordRegistry.dailyKeywordData, null, 2))
    })
  )

  /* ---
    Session
  ---*/

  async function getSession(createIfNone = false) {
    const session = await vscode.authentication.getSession(AUTHENTICATION_TYPE, [], { createIfNone })

    if (!session) return null

    if (createIfNone) {
      vscode.window.showInformationMessage(`Arccode - Signed in as ${session.account.label}`)

      await activateExtension()
    }

    return session
  }

  async function promptSession() {
    const session = await getSession()

    if (session) return

    const response = await vscode.window.showInformationMessage('Welcome to Arccode! Sign in to get started.', 'Sign in')

    if (response !== 'Sign in') return

    vscode.commands.executeCommand('arccode.signIn')
  }

  /* ---
    API
  ---*/

  async function getIdToken() {
    const session = await getSession()

    if (!session) {
      vscode.window.showInformationMessage('Arccode - You must sign in first')

      return
    }

    // On local dev we return the id token behind session.accessToken
    // https://stackoverflow.com/questions/69205747/bad-request-when-fetching-id-token-from-google
    if (process.env.DEV) return session.accessToken

    try {
      // https://firebase.google.com/docs/reference/rest/auth
      const response = await axios.post(
        EXCHANGE_TOKENS_API_URL,
        `grant_type=refresh_token&refresh_token=${session.accessToken}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      await authenticationProvider.updateSession(session.id, response.data.refresh_token)

      return response.data.id_token as string
    }
    catch (error: any) {
      vscode.window.showInformationMessage(`Arccode - error refreshing token: ${error.message}`)
      vscode.window.showInformationMessage(error.code)
    }
  }

  async function activateExtension(displayMessage = false) {
    try {
      const idToken = await getIdToken()

      if (!idToken) return

      await axios.post(
        ACTIVATE_EXTENSION_API_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )

      if (displayMessage) {
        vscode.window.showInformationMessage('Arccode extension activated!')
      }
    }
    catch (error: any) {
      vscode.window.showInformationMessage(`Arccode - error activating extension: ${error.message}`)
    }
  }

  async function sync(keywordRegistry: KeywordRegistry, displayMessage = false) {
    try {
      const idToken = await getIdToken()

      if (!idToken) return

      keywordRegistry.updateTimestamp()

      await axios.post(
        REGISTER_KEYWORDS_API_URL,
        {
          keywords: keywordRegistry.getKeywords(),
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )

      keywordRegistry.resetData()

      if (displayMessage) {
        vscode.window.showInformationMessage('Arccode sync complete!')
      }
    }
    catch (error: any) {
      vscode.window.showInformationMessage(`Arccode - error syncing: ${error.message}`)
    }
  }
}

export function deactivate() {}
