import { useContext } from 'react'

import UsersContext from '~contexts/administrator/UsersContext'

function useUsers() {
  return useContext(UsersContext)
}

export default useUsers
