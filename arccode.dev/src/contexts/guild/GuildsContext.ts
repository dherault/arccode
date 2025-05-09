import { createContext } from 'react'

import type { Guild } from '~types'

export type GuildsContextType = {
  guilds: Guild[]
  loadingGuilds: boolean
  hasMoreGuilds: boolean
  createGuild: (name: string) => Promise<void>
  fetchMoreGuilds: () => void
}

export default createContext<GuildsContextType>({
  guilds: [],
  loadingGuilds: false,
  hasMoreGuilds: false,
  createGuild: async () => {},
  fetchMoreGuilds: () => {},
})
