import { createContext } from 'react'

import type { Guild } from '~types'

export type GuildContextType = {
  guild: Guild | null
  setGuildId: (guildId: string) => void
}

export default createContext<GuildContextType>({
  guild: null,
  setGuildId: () => {},
})
