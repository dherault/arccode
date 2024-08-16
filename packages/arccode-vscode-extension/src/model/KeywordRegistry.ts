import * as vscode from 'vscode'

import type { KeywordData, Language } from '../types'
import {
  CURRENT_KEYWORDS_STORAGE_KEY,
  DAILY_KEYWORDS_STORAGE_KEY,
  LANGUAGE_CONVERSION,
  SYNC_PERIOD,
} from '../constants'

class KeywordRegistry {
  private context: vscode.ExtensionContext

  private updatedAt: Date

  private dailyKeywords: KeywordData

  private currentKeywords: KeywordData

  constructor(context: vscode.ExtensionContext) {
    this.context = context

    this.updatedAt = new Date()
    this.dailyKeywords = {}
    this.currentKeywords = {}

    try {
      const dailyKeywordsJson = context.globalState.get(DAILY_KEYWORDS_STORAGE_KEY)
      const currentKeywordsJson = context.globalState.get(CURRENT_KEYWORDS_STORAGE_KEY)

      if (dailyKeywordsJson) this.dailyKeywords = JSON.parse(dailyKeywordsJson as string)
      if (currentKeywordsJson) this.currentKeywords = JSON.parse(currentKeywordsJson as string)
    }
    catch (error) {
      //
    }
  }

  public registerKeyword(language: Language, keyword: string, delta: number) {
    if (!keyword) return

    const finalLanguage = LANGUAGE_CONVERSION[language] ?? language

    if (!this.dailyKeywords[finalLanguage]) this.dailyKeywords[finalLanguage] = {}
    if (!this.currentKeywords[finalLanguage]) this.currentKeywords[finalLanguage] = {}
    if (!this.dailyKeywords[finalLanguage][keyword]) this.dailyKeywords[finalLanguage][keyword] = 0
    if (!this.currentKeywords[finalLanguage][keyword]) this.currentKeywords[finalLanguage][keyword] = 0

    this.dailyKeywords[finalLanguage][keyword] += delta
    this.currentKeywords[finalLanguage][keyword] += delta
    this.updatedAt = new Date()

    this.context.globalState.update(DAILY_KEYWORDS_STORAGE_KEY, JSON.stringify(this.dailyKeywords))
    this.context.globalState.update(CURRENT_KEYWORDS_STORAGE_KEY, JSON.stringify(this.currentKeywords))
  }

  // Filter keywords with negative or zero count
  private filterKeywords(keywordsData: KeywordData): KeywordData {
    return Object.fromEntries(
      Object.entries(keywordsData)
      .map(([language, keywords]) => [
        language,
        Object.fromEntries(
          Object.entries(keywords!)
          .filter(([, count]) => count > 0)
        ),
      ])
      .filter(([, keywords]) => Object.keys(keywords).length)
    )
  }

  public reset() {
    this.currentKeywords = {}
    this.context.globalState.update(CURRENT_KEYWORDS_STORAGE_KEY, JSON.stringify(this.currentKeywords))

    if (new Date().getDate() !== this.updatedAt.getDate()) {
      this.dailyKeywords = {}
      this.context.globalState.update(DAILY_KEYWORDS_STORAGE_KEY, JSON.stringify(this.dailyKeywords))
    }

    this.updatedAt = new Date()
  }

  public get filteredCurrentKeywords() {
    return this.filterKeywords(this.currentKeywords)
  }

  public get filteredDailyKeywords() {
    return this.filterKeywords(this.dailyKeywords)
  }

  public get shouldSync() {
    return Date.now() - this.updatedAt.valueOf() >= SYNC_PERIOD
  }
}

export default KeywordRegistry
