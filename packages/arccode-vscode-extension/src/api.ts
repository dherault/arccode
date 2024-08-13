import * as vscode from 'vscode'
import axios from 'axios'

import { ACTIVATE_EXTENSION_API_URL, REGISTER_KEYWORDS_API_URL } from './constants'
import type KeywordRegistry from './KeywordRegistry'
import { getSession } from './session'

export async function activateExtension() {
  try {
    const session = await getSession()

    if (!session) return

    await axios.post(
      ACTIVATE_EXTENSION_API_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )
  }
  catch (error: any) {
    vscode.window.showInformationMessage(`Arccode - error activating extension: ${error.message}`)
  }
}

export async function sync(keywordRegistry: KeywordRegistry) {
  try {
    const session = await getSession()

    if (!session) return

    await axios.post(
      REGISTER_KEYWORDS_API_URL,
      {
        keywords: keywordRegistry.currentKeywordData,
      },
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )

    keywordRegistry.flush()
  }
  catch (error: any) {
    vscode.window.showInformationMessage(`Arccode - error syncing: ${error.message}`)
  }
}
