export const AUTHENTICATION_URL = process.env.NODE_ENV === 'production'
  ? 'https://arccode-app.web.app/authentication'
  : 'http://localhost:5173/authentication'

export const AUTHENTICATION_TYPE = 'arccode'

export const AUTHENTICATION_NAME = 'Arccode'

export const SESSIONS_SECRET_KEY = `${AUTHENTICATION_TYPE}.sessions`

export const CODE_EXCHANGE_PROMISE_KEY = 'CODE_EXCHANGE_PROMISE'

export const MAX_LINES = 5000
