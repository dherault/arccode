import { useCallback, useEffect, useState } from 'react'

import useEventListener from '~hooks/common/useEventListener'

interface WindowSize {
  width: number
  height: number
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  const handleSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useEffect(() => {
    handleSize()
  }, [handleSize])

  return windowSize
}

export default useWindowSize
