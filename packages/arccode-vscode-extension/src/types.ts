import languageToKeywords from './keywords'

export type UserInfo = {
  accessToken: string
  userId: string
  userName: string
}

export type Language = keyof typeof languageToKeywords

export type FileRegistry = Record<string, string> // File uri -> file content

export type KeywordRegistry = Partial<Record<Language, Record<string, number>>> // Language -> keyword -> count

export interface PromiseAdapter<T, U> {
  (
    value: T,
    resolve: (value: U | PromiseLike<U>) => void,
    reject: (reason: any) => void
  ): any;
}
