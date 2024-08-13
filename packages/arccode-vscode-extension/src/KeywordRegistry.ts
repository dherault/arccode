import type { KeywordData, Language } from './types'

class KeywordRegistry {
  public updatedAt: Date

  public dailyKeywordData: KeywordData

  private currentKeywordData: KeywordData

  private languageConversion: Partial<Record<Language, Language>>

  constructor() {
    this.updatedAt = new Date()
    this.dailyKeywordData = {}
    this.currentKeywordData = {}
    this.languageConversion = {
      javascriptreact: 'javascript',
      typescriptreact: 'typescript',
    }
  }

  public registerKeyword(language: Language, keyword: string, delta = 1) {
    const finalLanguage = this.languageConversion[language] ?? language

    if (!this.dailyKeywordData[finalLanguage]) this.dailyKeywordData[finalLanguage] = {}
    if (!this.currentKeywordData[finalLanguage]) this.currentKeywordData[finalLanguage] = {}
    if (!this.dailyKeywordData[finalLanguage][keyword]) this.dailyKeywordData[finalLanguage][keyword] = 0
    if (!this.currentKeywordData[finalLanguage][keyword]) this.currentKeywordData[finalLanguage][keyword] = 0

    this.dailyKeywordData[finalLanguage][keyword] += delta
    this.currentKeywordData[finalLanguage][keyword] += delta
    this.updatedAt = new Date()
  }

  // Get keywords with positive count
  public getKeywords(): KeywordData {
    return Object.fromEntries(
      Object.entries(this.currentKeywordData).map(([langugage, keywords]) => [
        langugage,
        Object.fromEntries(
          Object.entries(keywords).filter(([, count]) => count > 0)
        ),
      ])
    )
  }

  public resetData() {
    this.currentKeywordData = {}

    if (new Date().getDate() !== this.updatedAt.getDate()) {
      this.dailyKeywordData = {}
    }
  }

  public updateTimestamp() {
    this.updatedAt = new Date()
  }
}

export default KeywordRegistry
