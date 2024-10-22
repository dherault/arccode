import type { Language } from './types'

/* ---
  Configuration
--- */

export const CONFIGURATION_KEY = 'arccode'

/* ---
  Authentication
--- */

export const AUTHENTICATION_URL = process.env.DEV
  ? 'http://localhost:5173/authentication'
  : 'https://arccode.dev/authentication'

export const AUTHENTICATION_TYPE = 'arccode'

export const AUTHENTICATION_NAME = 'Arccode'

export const SESSIONS_SECRET_KEY = 'arccode.sessions'

export const CODE_EXCHANGE_PROMISE_KEY = 'arccode.codeExchangePromise'

/* ---
  API
--- */

export const FIREBASE_API_KEY = 'AIzaSyAHsRDKVNB2Ql83xxoEOa-YajFyvtKtPtY'

export const EXCHANGE_TOKENS_API_URL = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`

export const ACTIVATE_EXTENSION_API_URL = process.env.DEV
  ? 'http://localhost:5001/arccode-dev/us-central1/activateVscodeExtension'
  : 'https://activatevscodeextension-ynstfmkxyq-uc.a.run.app'

export const REGISTER_KEYWORDS_API_URL = process.env.DEV
  ? 'http://localhost:5001/arccode-dev/us-central1/registerKeywords'
  : 'https://registerkeywords-ynstfmkxyq-uc.a.run.app'

/* ---
  Sync and data
--- */

export const SYNC_PERIOD = 1000 * 60 * 15

export const MAX_LINES = 8000

export const DAILY_KEYWORDS_STORAGE_KEY = 'arccode.dailyKeywords'

export const CURRENT_KEYWORDS_STORAGE_KEY = 'arccode.currentKeywords'

export const LANGUAGE_CONVERSION: Partial<Record<Language, Language>> = {
  javascriptreact: 'javascript',
  typescriptreact: 'typescript',
}
