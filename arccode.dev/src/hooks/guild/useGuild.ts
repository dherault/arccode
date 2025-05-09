import { useContext } from 'react'

import GuildContext from '~contexts/guild/GuildContext'

function useGuild() {
  return useContext(GuildContext)
}

export default useGuild
