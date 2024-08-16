import { User } from '~types'

import { INITIAL_CHARACTER } from '~constants'

type CreateUserArg = Omit<
  User,
  'hasSentSignupMessages'
  | 'hasConnectedExtension'
  | 'isAdministrator'
  | 'character'
  | 'nUpdates'
  | 'metadata'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>

function createUser(user: CreateUserArg): User {
  const now = new Date().toISOString()

  return {
    ...user,
    hasSentSignupMessages: false,
    hasConnectedExtension: false,
    isAdministrator: false,
    character: INITIAL_CHARACTER,
    metadata: {},
    nUpdates: 0,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
