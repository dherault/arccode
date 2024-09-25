import { type PropsWithChildren, useCallback, useMemo } from 'react'
import { collection, or, orderBy, query, where } from 'firebase/firestore'

import type { Guild } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import { db } from '~firebase'

import type { GuildsContextType } from '~contexts/guild/GuildsContext'
import GuildsContext from '~contexts/guild/GuildsContext'

import useUser from '~hooks/user/useUser'
import usePaginatedDocuments from '~hooks/db/usePaginatedDocuments'

function GuildsProvider({ children }: PropsWithChildren) {
  const { user } = useUser()
  const q = useMemo(() => query(
    collection(db, 'guilds'),
    or(
      where('isPrivate', '==', false),
      where('memberIds', 'array-contains', user?.id ?? NULL_DOCUMENT_ID),
    ),
    orderBy('lastMessageAt', 'desc'),
  ), [
    user?.id,
  ])
  const { data: guilds, loading, error, hasMore, fetchMore } = usePaginatedDocuments<Guild>(q, 25)

  const createGuild = useCallback(async (name: string) => {
    console.log('name', name)
  }, [])

  const guildsContextValue = useMemo<GuildsContextType>(() => ({
    guilds,
    loadingGuilds: loading,
    hasMoreGuilds: hasMore,
    createGuild,
    fetchMoreGuilds: fetchMore,
  }), [
    guilds,
    loading,
    hasMore,
    createGuild,
    fetchMore,
  ])

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
