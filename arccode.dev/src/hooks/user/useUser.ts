import { useContext } from 'react'

import UserContext from '~contexts/authentication/UserContext'

function useUser() {
  return useContext(UserContext)
}

export default useUser
