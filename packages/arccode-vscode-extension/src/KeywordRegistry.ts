import { SYNC_PERIOD } from './constants'
import type { KeywordData, Language } from './types'

class KeywordRegistry {
  private updatedAt: Date

  private dailyKeywords: KeywordData

  private currentKeywords: KeywordData

  private languageConversion: Partial<Record<Language, Language>>

  constructor() {
    this.updatedAt = new Date()
    this.dailyKeywords = {}
    this.currentKeywords = {}
    this.languageConversion = {
      javascriptreact: 'javascript',
      typescriptreact: 'typescript',
    }
  }

  public registerKeyword(language: Language, keyword: string, delta = 1) {
    const finalLanguage = this.languageConversion[language] ?? language

    if (!this.dailyKeywords[finalLanguage]) this.dailyKeywords[finalLanguage] = {}
    if (!this.currentKeywords[finalLanguage]) this.currentKeywords[finalLanguage] = {}
    if (!this.dailyKeywords[finalLanguage][keyword]) this.dailyKeywords[finalLanguage][keyword] = 0
    if (!this.currentKeywords[finalLanguage][keyword]) this.currentKeywords[finalLanguage][keyword] = 0

    this.dailyKeywords[finalLanguage][keyword] += delta
    this.currentKeywords[finalLanguage][keyword] += delta
    this.updatedAt = new Date()
  }

  // Filter keywords with negative or zero count
  private filterKeywords(keywords: KeywordData): KeywordData {
    return Object.fromEntries(
      Object.entries(keywords).map(([langugage, keywords]) => [
        langugage,
        Object.fromEntries(
          Object.entries(keywords).filter(([, count]) => count > 0)
        ),
      ])
    )
  }

  public reset() {
    this.currentKeywords = {}

    if (new Date().getDate() !== this.updatedAt.getDate()) {
      this.dailyKeywords = {}
    }
  }

  public updateTimestamp() {
    this.updatedAt = new Date()
  }

  public get filteredCurrentKeywords() {
    return this.filterKeywords(this.currentKeywords)
  }

  public get filteredDailyKeywords() {
    return this.filterKeywords(this.dailyKeywords)
  }

  public get shouldSync() {
    return Date.now() - this.updatedAt.valueOf() < SYNC_PERIOD
  }
}

export default KeywordRegistry
