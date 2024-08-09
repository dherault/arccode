import { useEffect, useState } from 'react'

function prepareFunction(value: any) {
  return typeof value === 'function' ? () => value : value
}

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(prepareFunction(value))

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(prepareFunction(value)), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return delay === 0 ? value : debouncedValue
}

export default useDebounce
