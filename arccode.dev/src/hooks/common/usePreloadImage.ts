import { useEffect } from 'react'

function usePreloadImage(src: string) {
  useEffect(() => {
    const image = new Image()

    image.src = src
  }, [
    src,
  ])
}

export default usePreloadImage
