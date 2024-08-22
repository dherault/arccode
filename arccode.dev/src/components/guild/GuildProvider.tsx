import { type PropsWithChildren, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import GuildContext, { GuildContextType } from '~contexts/guild/GuildContext'

import useGuilds from '~hooks/guild/useGuilds'

const GUILD_ID_SEARCH_PARAMETERS_KEY = 'guild'

function GuildProvider({ children }: PropsWithChildren) {
  const { guilds } = useGuilds()
  const [searchParams, setSearchParams] = useSearchParams()
  const guildId = searchParams.get(GUILD_ID_SEARCH_PARAMETERS_KEY) ?? ''
  const guild = useMemo(() => guilds.find(x => x.id === guildId) ?? null, [guildId, guilds])

  const setGuildId = useCallback((guildId: string) => {
    setSearchParams(x => {
      x.set(GUILD_ID_SEARCH_PARAMETERS_KEY, guildId)

      return x
    }, {
      replace: true,
    })
  }, [
    setSearchParams,
  ])

  const guildContextValue = useMemo<GuildContextType>(() => ({
    guild,
    setGuildId,
  }), [
    guild,
    setGuildId,
  ])

  return (
    <GuildContext.Provider value={guildContextValue}>
      {children}
    </GuildContext.Provider>
  )
}

export default GuildProvider
