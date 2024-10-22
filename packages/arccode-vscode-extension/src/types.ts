import { languageToKeywords } from './core/languages'

export type UserInfo = {
  idToken: string
  refreshToken: string
  userId: string
  userName: string
}

export type Language = keyof typeof languageToKeywords

export interface PromiseAdapter<T, U> {
  (
    value: T,
    resolve: (value: U | PromiseLike<U>) => void,
    reject: (reason: any) => void
  ): any;
}
