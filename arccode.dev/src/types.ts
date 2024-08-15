/* ---
  Database resources
--- */

import type { CHARACTER_SLOTS } from '~constants'

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
  isAdministrator: boolean
  character: Character
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
  Character
--- */

export type KeywordRegistry = Record<string, Record<string, number>>

export type Character = {
  name: string
  level: number
  levelUps: number
  levelUpsKeywords: KeywordRegistry
  keywords: KeywordRegistry
  viewedKeywords: KeywordRegistry
  processedKeywords: KeywordRegistry
  unlockedItems: Record<string, number>
  avatarItemId: string
  mainHandItemId: string
  offHandItemId: string
  helmItemId: string
  armorItemId: string
  glovesItemId: string
  bootsItemId: string
  amuletItemId: string
  ringItemId: string
  spell1ItemId: string
  spell2ItemId: string
  spell3ItemId: string
  spell4ItemId: string
}

export type CharacterSlot = typeof CHARACTER_SLOTS[number]

/* ---
  Items
--- */

export type ItemRarity = 'legendary'
  | 'epic'
  | 'rare'
  | 'uncommon'
  | 'common'

export type ItemType = 'avatar'
  | 'main-hand'
  | 'off-hand'
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
  image: string
  imagePadding?: boolean
  type: ItemType
  rarity: ItemRarity
}

/* ---
  Keyword
--- */

export type Keyword = {
  language: string
  name: string
  count: number
  level: number
  thresholdMin: number
  thresholdMax: number
}

/* ---
  Authentication
--- */

export type SignInProvider = 'password' | 'google' | 'github'

export type VscodeExtensionRedirectionState = {
  uri: string
  state: string
}
