import { useContext } from 'react'

import GuildsContext from '~contexts/guild/GuildsContext'

function useGuilds() {
  return useContext(GuildsContext)
}

export default useGuilds
