import { useEffect, useState } from 'react'

type StatusType = 'loading' | 'success' | 'error'

export default function useImageLoading(url: string) {
  const [status, setStatus] = useState<StatusType>('loading')

  useEffect(() => {
    if (!url) return
    const img = document.createElement('img')
    const onLoad = () => setStatus('success')
    const onError = () => setStatus('error')

    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)
    img.src = url

    return () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
    }
  }, [
    url,
  ])

  return {
    status,
    src: url,
  }
}
