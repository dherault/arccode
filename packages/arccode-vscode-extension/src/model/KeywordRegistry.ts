import * as vscode from 'vscode'
import { type KeywordRegistry as KeywordRegistryType, filterKeywordRegistry } from 'arccode-core'

import type { Language } from '../types'
import {
  CONFIGURATION_KEY,
  CURRENT_KEYWORDS_STORAGE_KEY,
  DAILY_KEYWORDS_STORAGE_KEY,
  LANGUAGE_CONVERSION,
  SYNC_PERIOD,
} from '../constants'

class KeywordRegistry {
  private context: vscode.ExtensionContext

  private updatedAt: Date

  private dailyKeywordRegistry: KeywordRegistryType

  private currentKeywordRegistry: KeywordRegistryType

  constructor(context: vscode.ExtensionContext) {
    this.context = context

    this.updatedAt = new Date()
    this.dailyKeywordRegistry = {}
    this.currentKeywordRegistry = {}

    try {
      const dailyKeywordRegistryJson = context.globalState.get(DAILY_KEYWORDS_STORAGE_KEY)
      const currentKeywordRegistryJson = context.globalState.get(CURRENT_KEYWORDS_STORAGE_KEY)

      if (dailyKeywordRegistryJson) this.dailyKeywordRegistry = JSON.parse(dailyKeywordRegistryJson as string)
      if (currentKeywordRegistryJson) this.currentKeywordRegistry = JSON.parse(currentKeywordRegistryJson as string)
    }
    catch (error) {
      //
    }
  }

  public registerKeyword(language: Language, keyword: string, delta: number) {
    if (!keyword) return

    const finalLanguage = LANGUAGE_CONVERSION[language] ?? language

    if (!this.dailyKeywordRegistry[finalLanguage]) this.dailyKeywordRegistry[finalLanguage] = {}
    if (!this.currentKeywordRegistry[finalLanguage]) this.currentKeywordRegistry[finalLanguage] = {}
    if (!this.dailyKeywordRegistry[finalLanguage][keyword]) this.dailyKeywordRegistry[finalLanguage][keyword] = 0
    if (!this.currentKeywordRegistry[finalLanguage][keyword]) this.currentKeywordRegistry[finalLanguage][keyword] = 0

    this.dailyKeywordRegistry[finalLanguage][keyword] += delta
    this.currentKeywordRegistry[finalLanguage][keyword] += delta
    this.updatedAt = new Date()

    this.context.globalState.update(DAILY_KEYWORDS_STORAGE_KEY, JSON.stringify(this.dailyKeywordRegistry))
    this.context.globalState.update(CURRENT_KEYWORDS_STORAGE_KEY, JSON.stringify(this.currentKeywordRegistry))

    const configuration = vscode.workspace.getConfiguration(CONFIGURATION_KEY)

    if (configuration.get('debug')) {
      vscode.window.showInformationMessage(`${keyword}: ${delta}`)
    }
  }

  public reset() {
    this.currentKeywordRegistry = {}
    this.context.globalState.update(CURRENT_KEYWORDS_STORAGE_KEY, JSON.stringify(this.currentKeywordRegistry))

    if (new Date().getDate() !== this.updatedAt.getDate()) {
      this.dailyKeywordRegistry = {}
      this.context.globalState.update(DAILY_KEYWORDS_STORAGE_KEY, JSON.stringify(this.dailyKeywordRegistry))
    }

    this.updatedAt = new Date()
  }

  public get filteredCurrentKeywordRegistry() {
    return filterKeywordRegistry(this.currentKeywordRegistry)
  }

  public get filteredDailyKeywordRegistry() {
    return filterKeywordRegistry(this.dailyKeywordRegistry)
  }

  public get shouldSync() {
    return Date.now() - this.updatedAt.valueOf() >= SYNC_PERIOD
  }
}

export default KeywordRegistry
