import type { Character, Keyword, KeywordRegistry } from 'arccode-core'

/* ---
  Database resources
--- */

import type { CHARACTER_SLOTS } from '~constants'

export type {
  Character,
  Keyword,
  KeywordRegistry,
}

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
  nUpdates: number
  sentDailyRecapEmailAt: string
  timezoneOffset: number
  guildIds?: string[]
}>

export type Guild = DatabaseResource<{
  name: string
  emoji: string
  description: string
  isPrivate: boolean
  administratorIds: string[]
  moderatorIds: string[]
  memberIds: string[]
}>

/* ---
  Character
--- */

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
  Authentication
--- */

export type SignInProvider = 'password' | 'google.com' | 'github.com'

export type VscodeExtensionRedirectionState = {
  uri: string
  state: string
}
