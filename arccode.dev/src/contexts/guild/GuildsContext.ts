import { createContext } from 'react'

import type { Guild } from '~types'

export type GuildsContextType = {
  guilds: Guild[]
  createGuild: (name: string) => Promise<void>
}

export default createContext<GuildsContextType>({
  guilds: [],
  createGuild: async () => {},
})
