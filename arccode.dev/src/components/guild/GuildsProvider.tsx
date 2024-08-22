import { type PropsWithChildren, useCallback, useMemo } from 'react'
import { collection, limit, or, orderBy, query, where } from 'firebase/firestore'

import type { Guild } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import { db } from '~firebase'

import type { GuildsContextType } from '~contexts/guild/GuildsContext'
import GuildsContext from '~contexts/guild/GuildsContext'

import useDocuments from '~hooks/db/useDocuments'
import useUser from '~hooks/user/useUser'

import SpinnerCentered from '~components/common/CenteredSpinner'

const PAGINATION_LIMIT = 100

function GuildsProvider({ children }: PropsWithChildren) {
  const { user } = useUser()
  const q = useMemo(() => query(
    collection(db, 'guilds'),
    or(
      where('isPrivate', '==', false),
      where('memberIds', 'array-contains', user?.id ?? NULL_DOCUMENT_ID),
    ),
    orderBy('createdAt', 'desc'),
    limit(PAGINATION_LIMIT),
  ), [
    user?.id,
  ])
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
