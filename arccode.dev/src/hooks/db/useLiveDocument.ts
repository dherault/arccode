import { useCallback, useEffect, useState } from 'react'
import { type DocumentReference, onSnapshot } from 'firebase/firestore'

import type { DatabaseResource } from '~types'

function useLiveDocument<T extends DatabaseResource>(doc: DocumentReference, enabled = true) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(() => {
    if (!enabled) {
      setData(null)
      setLoading(false)

      return
    }

    onSnapshot(doc, querySnapshot => {
      if (querySnapshot.exists()) {
        const data = querySnapshot.data() as T

        setData(data)
      }

      setError(null)
      setLoading(false)
    }, error => {
      console.error(error)

      setLoading(false)
      setError(error)
    })
  }, [doc, enabled])

  useEffect(fetch, [fetch])

  return { data, loading, error }
}

export default useLiveDocument
