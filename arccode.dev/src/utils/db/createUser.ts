import { User } from '~types'

type CreateUserArg = Omit<
  User,
  'name'
  | 'hasSentSignupMessages'
  | 'hasConnectedExtension'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>

function createUser(user: CreateUserArg): User {
  const now = new Date().toISOString()

  return {
    ...user,
    name: '',
    hasSentSignupMessages: false,
    hasConnectedExtension: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
