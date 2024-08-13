/* ---
  Common
--- */

import type { Character, CharacterSlot, ItemRarity, ItemType } from '~types'

export const APP_URL = 'https://arccode.dev'

/* ---
  Authentication
--- */

export const AUTHENTICATION_ERRORS = {
  default: 'An error occurred, please try again',
  terms: 'You must accept the Terms and Conditions',
  'auth/email-already-in-use': 'This email is already in use',
  'auth/invalid-email': 'You must provide a valid email',
  'auth/weak-password': 'Your password must be at least 8 characters',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'This account does not exist, please sign up',
  'auth/wrong-password': 'Your password is incorrect',
}

/* ---
  Legal
--- */

export const LEGAL_COMPANY_NAME = 'Microentreprise David Hérault'

export const LEGAL_DATE = '1 October 2024'

export const LEGAL_LAST_UPDATED_DATE = '1 October 2024'

/* ---
  Legal
--- */

export const SUPPORT_EMAIL = 'dherault@gmail.com'

/* ---
  Other
--- */

export const NULL_DOCUMENT_ID = '_null_'

/* ---
  Character
--- */

export const INITIAL_CHARACTER: Character = {
  name: '',
  keywords: {},
  unlockedItems: {
    'avatar-7': 1,
  },
  avatarItemId: 'avatar-7',
  mainHandItemId: '',
  offHandItemId: '',
  helmItemId: '',
  armorItemId: '',
  glovesItemId: '',
  bootsItemId: '',
  amuletItemId: '',
  ringItemId: '',
  spell1ItemId: '',
  spell2ItemId: '',
  spell3ItemId: '',
  spell4ItemId: '',
}

export const CHARACTER_SLOTS = [
  'avatarItemId',
  'mainHandItemId',
  'offHandItemId',
  'helmItemId',
  'armorItemId',
  'glovesItemId',
  'bootsItemId',
  'amuletItemId',
  'ringItemId',
  'spell1ItemId',
  'spell2ItemId',
  'spell3ItemId',
  'spell4ItemId',
] as const

export const CHARACTER_SLOT_LABELS: Record<CharacterSlot, string> = {
  avatarItemId: 'Avatar',
  mainHandItemId: 'Main Hand',
  offHandItemId: 'Off Hand',
  helmItemId: 'Helm',
  armorItemId: 'Armor',
  glovesItemId: 'Gloves',
  bootsItemId: 'Boots',
  amuletItemId: 'Amulet',
  ringItemId: 'Ring',
  spell1ItemId: 'Spell 1',
  spell2ItemId: 'Spell 2',
  spell3ItemId: 'Spell 3',
  spell4ItemId: 'Spell 4',
} as const

export const CHARACTER_SLOT_TYPES: Record<CharacterSlot, ItemType> = {
  avatarItemId: 'avatar',
  mainHandItemId: 'main-hand',
  offHandItemId: 'off-hand',
  helmItemId: 'helm',
  armorItemId: 'armor',
  glovesItemId: 'gloves',
  bootsItemId: 'boots',
  amuletItemId: 'amulet',
  ringItemId: 'ring',
  spell1ItemId: 'spell',
  spell2ItemId: 'spell',
  spell3ItemId: 'spell',
  spell4ItemId: 'spell',
} as const

export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  avatar: 'Avatar',
  'main-hand': 'Main Hand',
  'off-hand': 'Off Hand',
  helm: 'Helm',
  armor: 'Armor',
  gloves: 'Gloves',
  boots: 'Boots',
  amulet: 'Amulet',
  ring: 'Ring',
  spell: 'Spell',
}

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: '#328BFF',
  uncommon: '#3DFF7B',
  rare: '#F30A54',
  epic: '#FF49BF',
  legendary: '#FFBE3D',
}
