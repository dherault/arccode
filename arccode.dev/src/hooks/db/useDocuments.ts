import { useCallback, useEffect, useState } from 'react'
import { type Query, getDocs } from 'firebase/firestore'

import type { DatabaseResource } from '~types'

function useDocuments<T extends DatabaseResource>(query: Query, enabled = true) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(query)
      const data: T[] = []

      querySnapshot.forEach(doc => {
        data.push(doc.data() as T)
      })

      setData(data.sort((a, b) => b.updatedAt < a.updatedAt ? -1 : 1))
    }
    catch (error) {
      console.error(error)
      setError(error as Error)
    }
  }, [query])

  const fetch = useCallback(async () => {
    if (!enabled) {
      setData([])
      setLoading(false)
      setError(null)

      return
    }

    setLoading(true)

    await refetch()

    setLoading(false)
  }, [
    enabled,
    refetch,
  ])

  useEffect(() => {
    fetch()
  }, [
    fetch,
  ])

  return { data, loading, error, refetch }
}

export default useDocuments
