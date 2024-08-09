import { useEffect, useState } from 'react'

function useLoadAsyncScript(src: string) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const script = document.createElement('script')

    script.src = src
    script.async = true
    script.onload = () => setLoading(false)

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [src])

  return loading
}

export default useLoadAsyncScript
