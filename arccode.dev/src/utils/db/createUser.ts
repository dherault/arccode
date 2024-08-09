import { User } from '~types'

type CreateUserArg = Omit<
  User,
  'imageUrl'
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
    imageUrl: '',
    signupMessagesSent: false,
    onboarded: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
