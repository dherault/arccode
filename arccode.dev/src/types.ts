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
  signupMessagesSent: boolean
  onboarded: boolean
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
  Helpers
--- */

export type SignInProvider = 'password' | 'google' | 'github'
