import { collection, limit, orderBy, query, startAt } from 'firebase/firestore'
import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'

import { User } from '~types'

import { db } from '~firebase'

import UsersContext, { type UsersContextType } from '~contexts/administrator/UsersContext'

import useLiveDocuments from '~hooks/db/useLiveDocuments'

import SpinnerCentered from '~components/common/CenteredSpinner'

const PAGINATION_SIZE = 100

function UsersProvider({ children }: PropsWithChildren) {
  const [cursor, setCursor] = useState(0)
  const [sortKey, setSortKey] = useState('createdAt')

  const q = useMemo(() => query(
    collection(db, 'users'),
    orderBy(sortKey),
    startAt(cursor),
    limit(PAGINATION_SIZE)
  ), [
    sortKey,
    cursor,
  ])

  const { data: users, loading, error } = useLiveDocuments<User>(q)

  const handlePreviousPage = useCallback(() => {
    setCursor(x => Math.max(0, x - PAGINATION_SIZE))
  }, [])

  const handleNextPage = useCallback(() => {
    setCursor(x => x + PAGINATION_SIZE)
  }, [])

  const usersContextValue = useMemo<UsersContextType>(() => ({
    users,
    page: cursor / PAGINATION_SIZE + 1,
    hasNextPage: users.length >= PAGINATION_SIZE,
    sortKey,
    setSortKey,
    goToPreviousPage: handlePreviousPage,
    goToNextPage: handleNextPage,
  }), [
    users,
    cursor,
    sortKey,
    setSortKey,
    handlePreviousPage,
    handleNextPage,
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
    <UsersContext.Provider value={usersContextValue}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersProvider
