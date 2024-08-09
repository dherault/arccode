import * as vscode from 'vscode'

import { AUTH_TYPE } from './constants'

async function getSession(createIfNone = false) {
  await vscode.authentication.getSession(AUTH_TYPE, [], { createIfNone })
}

export default getSession
