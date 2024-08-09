import * as vscode from 'vscode'

import { AUTHENTICATION_TYPE } from './constants'

async function getSession(createIfNone = false) {
  await vscode.authentication.getSession(AUTHENTICATION_TYPE, [], { createIfNone })
}

export default getSession
