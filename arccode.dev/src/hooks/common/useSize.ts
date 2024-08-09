import { type RefObject, useEffect, useState } from 'react'

function useSize(ref: RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const resizeObserver = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width)
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])

  return width
}

export default useSize
