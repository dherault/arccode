import { type Dispatch, type SetStateAction, createContext } from 'react'
import type { User as Viewer } from 'firebase/auth'

import type { User } from '~types'

export type UserContextType = {
  loading: boolean
  viewer: Viewer | null
  user: User | null
  setViewer: Dispatch<SetStateAction<Viewer | null>>
  updateUser: (user: Partial<User>) => Promise<void>
  signOut: () => Promise<void>
}

export default createContext<UserContextType>({
  loading: true,
  viewer: null,
  user: null,
  setViewer: () => {},
  signOut: async () => {},
  updateUser: async () => {},
})
