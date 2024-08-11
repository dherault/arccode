/* ---
  Common
--- */

import type { Character } from '~types'

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
  unlockedItems: {
    'avatar-7': 1,
  },
  avatarItemId: 'avatar-7',
  mainHandItemId: '',
  offHandItemId: '',
  bothHandsItemId: '',
  helmItemId: '',
  armorItemId: '',
  glovesItemId: '',
  bootsItemId: '',
  amuletItemId: '',
  ring1ItemId: '',
  ring2ItemId: '',
  spell1ItemId: '',
  spell2ItemId: '',
  spell3ItemId: '',
  spell4ItemId: '',
  spell5ItemId: '',
  spell6ItemId: '',
}
