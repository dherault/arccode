import { useCallback, useEffect, useState } from 'react'
import { type Query, onSnapshot } from 'firebase/firestore'

import type { DatabaseResource } from '~types'

import useDebounce from '~hooks/common/useDebounce'

function useLiveDocuments<T extends DatabaseResource>(query: Query, enabled = true) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(!!enabled)
  const [error, setError] = useState<Error | null>(null)
  // The first querysnapshot being always empty, but the second one being correct
  // we debounce loading to be certain we waited for the possible second fetch
  const debouncedLoading = useDebounce(loading, 300)
  const finalLoading = loading || debouncedLoading

  const fetch = useCallback(() => {
    if (!enabled) {
      setData([])
      setLoading(false)

      return
    }

    setLoading(true)

    return onSnapshot(
      query,
      querySnapshot => {
        const data: T[] = []

        querySnapshot.forEach(doc => {
          data.push(doc.data() as T)
        })

        data.sort((a, b) => b.updatedAt < a.updatedAt ? -1 : 1)

        setData(data)
        setError(null)
        setLoading(false)
      },
      error => {
        console.error(error)

        setLoading(false)
        setError(error)
      })
  }, [
    query,
    enabled,
  ])

  useEffect(fetch, [fetch])

  return {
    data,
    error,
    loading: finalLoading,
  }
}

export default useLiveDocuments
