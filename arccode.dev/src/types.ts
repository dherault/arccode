/* ---
  Database resources
--- */

export type DatabaseResource<T = unknown> = T & {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type User = DatabaseResource<{
  email: string
  name: string
  imageUrl: string
  signInProviders: SignInProvider[]
  hasSentSignupMessages: boolean
  hasConnectedExtension: boolean
}>

export type Email = DatabaseResource<{
  to: string
  message: {
    subject: string
    text?: string
    html?: string
  }
}>

/* ---
  Data
--- */

export type ItemType = 'main-hand'
  | 'off-hand'
  | 'both-hands'
  | 'helm'
  | 'armor'
  | 'gloves'
  | 'boots'
  | 'amulet'
  | 'ring'
  | 'spell'

export type Item = {
  id: string
  name: string
  type: ItemType
  rarity: number
}

/* ---
  Helpers
--- */

export type SignInProvider = 'password' | 'google' | 'github'
