import { User } from '~types'

import { INITIAL_CHARACTER } from '~constants'

type CreateUserArg = Omit<
  User,
  'name'
  | 'hasSentSignupMessages'
  | 'hasConnectedExtension'
  | 'isAdministrator'
  | 'character'
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
    isAdministrator: false,
    character: INITIAL_CHARACTER,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
