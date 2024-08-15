import languageToKeywords from './keywords'

export type UserInfo = {
  idToken: string
  refreshToken: string
  userId: string
  userName: string
}

export type Language = keyof typeof languageToKeywords

export type FileData = Record<string, string[][]> // File uri -> file line number -> seen lines

export type KeywordData = Partial<Record<Language, Record<string, number>>> // Language -> keyword -> count

export interface PromiseAdapter<T, U> {
  (
    value: T,
    resolve: (value: U | PromiseLike<U>) => void,
    reject: (reason: any) => void
  ): any;
}
