import { useEffect, useState } from 'react'

function useElementSize(element: HTMLElement | null) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!element) return

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [element])

  useEffect(() => {
    if (!element) return

    const { width, height } = element.getBoundingClientRect()

    setSize({ width, height })
  }, [element])

  return size
}

export default useElementSize
