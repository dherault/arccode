import { type Dispatch, type SetStateAction, createContext } from 'react'

import type { User } from '~types'

export type UsersContextType = {
  users: User[]
  page: number
  hasNextPage: boolean
  sortKey: string
  setSortKey: Dispatch<SetStateAction<string>>
  goToPreviousPage: () => void
  goToNextPage: () => void
}

export default createContext<UsersContextType>({
  users: [],
  page: 1,
  hasNextPage: false,
  sortKey: 'createdAt',
  setSortKey: () => {},
  goToPreviousPage: () => {},
  goToNextPage: () => {},
})
