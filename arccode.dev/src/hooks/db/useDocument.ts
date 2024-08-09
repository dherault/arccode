import { useCallback, useEffect, useState } from 'react'
import { type DocumentReference, getDoc } from 'firebase/firestore'

import type { DatabaseResource } from '~types'

function useDocument<T extends DatabaseResource>(doc: DocumentReference, enabled = true) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(async () => {
    if (!enabled) {
      setData(null)
      setLoading(false)
      setError(null)

      return
    }

    setLoading(true)
    setError(null)

    try {
      const document = await getDoc(doc)

      setData(document.data() as T ?? null)
    }
    catch (error) {
      console.error(error)
      setError(error as Error)
    }

    setLoading(false)
  }, [doc, enabled])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { data, loading, error, refetch: fetch }
}

export default useDocument
