import { User } from '~types'

type CreateUserArg = Omit<
  User,
  'name'
  | 'signupMessagesSent'
  | 'onboarded'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>

function createUser(user: CreateUserArg): User {
  const now = new Date().toISOString()

  return {
    ...user,
    name: '',
    signupMessagesSent: false,
    onboarded: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
