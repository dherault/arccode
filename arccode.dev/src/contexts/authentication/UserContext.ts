import { createContext } from 'react'
import type { User as Viewer } from 'firebase/auth'

import type { User } from '~types'

export type UserContextType = {
  loading: boolean
  viewer: Viewer | null
  user: User | null
  updateUser: (payload: Record<string, any>) => Promise<void>
  signOut: () => Promise<void>
}

export default createContext<UserContextType>({
  loading: true,
  viewer: null,
  user: null,
  signOut: async () => {},
  updateUser: async () => {},
})
