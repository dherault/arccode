import { useCallback, useEffect, useState } from 'react'
import { type DocumentReference, onSnapshot } from 'firebase/firestore'

import type { DatabaseResource } from '~types'

function useLiveDocument<T extends DatabaseResource>(doc: DocumentReference, enabled = true) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(() => {
    if (!enabled) {
      setData(null)

      return
    }

    setLoading(true)

    return onSnapshot(doc, querySnapshot => {
      if (querySnapshot.exists()) {
        setData(querySnapshot.data() as T)
      }

      setError(null)
      setLoading(false)
    }, error => {
      console.error(error)

      setLoading(false)
      setError(error)
    })
  }, [
    doc,
    enabled,
  ])

  useEffect(fetch, [fetch])

  return {
    data,
    loading,
    error,
  }
}

export default useLiveDocument
