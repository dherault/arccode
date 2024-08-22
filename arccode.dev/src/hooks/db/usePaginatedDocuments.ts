import { useCallback, useEffect, useMemo, useState } from 'react'
import { type DocumentSnapshot, type Query, getDocs, limit, query, startAfter } from 'firebase/firestore'

import type { DatabaseResource } from '~types'

function usePaginatedDocuments<T extends DatabaseResource>(q: Query, limitTo = 100, enabled = true) {
  const [data, setData] = useState<Record<string, T>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [cursor, setCursor] = useState<DocumentSnapshot | null>(null)
  const [nextCursor, setNextCursor] = useState<DocumentSnapshot | null>(null)
  const q2 = useMemo(() => cursor ? query(q, startAfter(cursor), limit(limitTo)) : query(q, limit(limitTo)), [q, limitTo, cursor])

  const refetch = useCallback(async () => {
    setLoading(true)

    try {
      const querySnapshot = await getDocs(q2)
      const data: T[] = []
      let lastDoc: DocumentSnapshot | null = null

      querySnapshot.forEach(doc => {
        data.push(doc.data() as T)
        lastDoc = doc
      })

      setData(x => ({
        ...x,
        ...data.reduce((acc, x) => ({ ...acc, [x.id]: x }), {}),
      }))
      setNextCursor(data.length === limitTo ? lastDoc : null)
    }
    catch (error) {
      console.error(error)
      setError(error as Error)
    }

    setLoading(false)
  }, [
    limitTo,
    q2,
  ])

  const fetch = useCallback(async () => {
    if (!enabled) {
      setData({})
      setLoading(false)
      setError(null)

      return
    }

    await refetch()
  }, [
    enabled,
    refetch,
  ])

  const fetchMore = useCallback(() => {
    if (!nextCursor) return

    setCursor(nextCursor)
  }, [
    nextCursor,
  ])

  useEffect(() => {
    fetch()
  }, [
    fetch,
  ])

  return {
    data: Object.values(data),
    loading,
    error,
    hasMore: !!nextCursor,
    refetch,
    fetchMore,
  }
}

export default usePaginatedDocuments
