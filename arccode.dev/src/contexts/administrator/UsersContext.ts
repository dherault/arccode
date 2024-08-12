import { createContext } from 'react'

import type { User } from '~types'

export type UsersContextType = {
  users: User[]
  page: number
  hasNextPage: boolean
  goToPreviousPage: () => void
  goToNextPage: () => void
}

export default createContext<UsersContextType>({
  users: [],
  page: 1,
  hasNextPage: false,
  goToPreviousPage: () => {},
  goToNextPage: () => {},
})
