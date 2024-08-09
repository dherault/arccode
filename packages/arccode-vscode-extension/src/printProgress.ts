import fs from 'node:fs'
import path from 'node:path'

import * as vscode from 'vscode'
import { dir } from 'tmp-promise'

import type KeywordRegistry from './KeywordRegistry'

let dirPath = ''
let filePath = ''

async function printProgress(keywordRegistry: KeywordRegistry) {
  if (!dirPath) dirPath = (await dir()).path
  if (!filePath) filePath = path.join(dirPath, 'Arccode progress of the day')

  await fs.promises.writeFile(filePath, JSON.stringify(keywordRegistry.dailyKeywordData, null, 2))

  const fileUri = vscode.Uri.file(filePath)
  const document = await vscode.workspace.openTextDocument(fileUri)

  await vscode.window.showTextDocument(document)
}

export default printProgress
