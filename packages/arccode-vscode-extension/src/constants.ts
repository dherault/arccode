export const AUTHENTICATION_URL = process.env.DEV
  ? 'http://localhost:5173/authentication'
  : 'https://arccode.dev/authentication'

export const AUTHENTICATION_TYPE = 'arccode'

export const AUTHENTICATION_NAME = 'Arccode'

export const SESSIONS_SECRET_KEY = `${AUTHENTICATION_TYPE}.sessions`

export const CODE_EXCHANGE_PROMISE_KEY = 'CODE_EXCHANGE_PROMISE'

export const MAX_LINES = 5000
