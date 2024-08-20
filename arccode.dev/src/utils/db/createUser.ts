import { User } from '~types'

import { INITIAL_CHARACTER } from '~constants'

import getTimezone from '~utils/common/getTimezone'

type CreateUserArg = Omit<
  User,
  'hasSentSignupMessages'
  | 'hasConnectedExtension'
  | 'isAdministrator'
  | 'character'
  | 'nUpdates'
  | 'sentDailyRecapEmailAt'
  | 'timezone'
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
    nUpdates: 0,
    sentDailyRecapEmailAt: new Date(0).toISOString(),
    timezone: getTimezone(),
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
