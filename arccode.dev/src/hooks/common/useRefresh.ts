import { useEffect, useState } from 'react'

function useRefresh(twice = false) {
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(x => !x)

    if (!twice) return

    setTimeout(() => setRefresh(x => !x), 2)
  }, [twice])

  return [refresh, setRefresh] as const
}

export default useRefresh
