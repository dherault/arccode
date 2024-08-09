import { useMemo } from 'react'

import useUser from '~hooks/user/useUser'

function useUserInitials() {
  const { user } = useUser()

  return useMemo(() => {
    if (!user) return []

    const initials = user.name.split(' ')
      .map(name => name[0])
      .filter(Boolean)
      .filter((_x, i) => i < 2)
      .map(char => char.toUpperCase())

    return initials.length ? initials : [user.email[0].toUpperCase()]
  }, [user])

}

export default useUserInitials
