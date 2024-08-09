export const AUTHENTICATION_URL = process.env.NODE_ENV === 'production'
  ? 'https://arccode-app.web.app/authentication'
  : 'http://localhost:5173/authentication'

export const MAX_LINES = 5000
