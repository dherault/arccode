import { type PropsWithChildren, useCallback, useMemo } from 'react'
import { collection, query } from 'firebase/firestore'

import type { Guild } from '~types'

import { db } from '~firebase'

import type { GuildsContextType } from '~contexts/guild/GuildsContext'
import GuildsContext from '~contexts/guild/GuildsContext'

import useDocuments from '~hooks/db/useDocuments'

import SpinnerCentered from '~components/common/CenteredSpinner'

function GuildsProvider({ children }: PropsWithChildren) {
  const q = useMemo(() => query(collection(db, 'guilds')), [])
  const { data: guilds, loading, error } = useDocuments<Guild>(q)

  const createGuild = useCallback(async (name: string) => {
    console.log('name', name)
  }, [])

  const guildsContextValue = useMemo<GuildsContextType>(() => ({
    guilds: guilds ?? [],
    createGuild,
  }), [
    guilds,
    createGuild,
  ])

  if (loading) {
    return (
      <SpinnerCentered />
    )
  }

  if (error) {
    return (
      <div>
        An error occurred.
      </div>
    )
  }

  return (
    <GuildsContext.Provider value={guildsContextValue}>
      {children}
    </GuildsContext.Provider>
  )
}

export default GuildsProvider
