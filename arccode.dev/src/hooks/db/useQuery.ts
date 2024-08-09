import { useCallback, useEffect, useState } from 'react'
import { type DocumentReference, getDoc } from 'firebase/firestore'

function useQuery<T>(doc: DocumentReference, enabled = true) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!enabled) return

    try {
      const docSnapshot = await getDoc(doc)

      if (docSnapshot.exists()) setData(docSnapshot.data() as T)
    }
    catch (error) {
      //
    }

    setLoading(false)
  }, [doc, enabled])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { data, loading }
}

export default useQuery
