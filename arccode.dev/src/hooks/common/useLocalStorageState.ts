import { useEffect, useState } from 'react'

function useLocalStorageState<T>(key: string, defaultValue: T) {
  let initialValue = null

  try {
    initialValue = JSON.parse(localStorage.getItem(key) ?? '') as T
  }
  catch (error) {
    //
  }

  const [value, setValue] = useState<T>(initialValue ?? defaultValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

export default useLocalStorageState
