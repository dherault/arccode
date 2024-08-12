import * as vscode from 'vscode'

import { AUTHENTICATION_TYPE } from './constants'
import { activateExtension } from './api'

export async function getSession(createIfNone = false) {
  const session = await vscode.authentication.getSession(AUTHENTICATION_TYPE, [], { createIfNone })

  if (!session) return null

  if (createIfNone) {
    await activateExtension()
  }

  return session
}

export async function promptSession() {
  const session = await getSession()

  if (session) return

  const response = await vscode.window.showInformationMessage('Welcome to Arccode! Sign in to get started.', 'Sign in')

  if (response !== 'Sign in') return

  vscode.commands.executeCommand('arccode.signIn')
}
