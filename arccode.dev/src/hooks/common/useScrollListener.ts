import { type RefObject, useEffect, useState } from 'react'

function useScrollListener(ref: RefObject<HTMLElement>) {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  })

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    function handleScroll() {
      setData(last => ({
        x: element.scrollLeft,
        y: element.scrollTop,
        lastX: last.x,
        lastY: last.y,
      }))
    }

    handleScroll()

    element.addEventListener('scroll', handleScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [ref])

  return data
}

export default useScrollListener
