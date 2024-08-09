import type { KeywordData, Language } from './types'

class KeywordRegistry {
  public dailyKeywordData: KeywordData

  private currentKeywordData: KeywordData

  private updatedAt: Date

  constructor() {
    this.dailyKeywordData = {}
    this.currentKeywordData = {}
    this.updatedAt = new Date()
  }

  public registerKeyword(language: Language, keyword: string, delta = 1) {
    if (!this.dailyKeywordData[language]) this.dailyKeywordData[language] = {}
    if (!this.currentKeywordData[language]) this.currentKeywordData[language] = {}
    if (!this.dailyKeywordData[language][keyword]) this.dailyKeywordData[language][keyword] = 0
    if (!this.currentKeywordData[language][keyword]) this.currentKeywordData[language][keyword] = 0

    this.dailyKeywordData[language][keyword] = Math.max(0, this.dailyKeywordData[language][keyword] + delta)
    this.currentKeywordData[language][keyword] = Math.max(0, this.currentKeywordData[language][keyword] + delta)
    this.updatedAt = new Date()
  }

  public flush() {
    return this.currentKeywordData
  }

  public reset() {
    this.currentKeywordData = {}

    if (new Date().getDate() !== this.updatedAt.getDate()) {
      this.dailyKeywordData = {}
    }

    this.updatedAt = new Date()
  }
}

export default KeywordRegistry
