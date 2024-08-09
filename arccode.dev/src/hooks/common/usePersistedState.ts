import { type SetStateAction, useCallback, useEffect, useState } from 'react'

const identity = (x: any) => x

// useState with localStorage persistence
function usePersistedState<T>(key: string, defaultValue: T, parser = identity) {
  const getLocalStorageKey = useCallback(() => `arccode:${key}`, [key])

  const getLocalStorageValue = useCallback(() => {
    try {
      const item = localStorage.getItem(getLocalStorageKey())

      if (item) return parser(JSON.parse(item))
    }
    catch (error) {
      console.log('Error on localStorage.getItem of', key)
    }

    return defaultValue
  }, [key, defaultValue, getLocalStorageKey, parser])

  const [state, setState] = useState<T>(getLocalStorageValue())

  const setLocalStorageState = useCallback((nextState: SetStateAction<T>) => {
    setState(x => {
      // @ts-expect-error
      const nextX = typeof nextState === 'function' ? nextState(x) : nextState

      localStorage.setItem(getLocalStorageKey(), JSON.stringify(nextX))

      return nextX
    })
  }, [getLocalStorageKey])

  const resetLocalStorageState = useCallback(() => {
    setLocalStorageState(defaultValue)
  }, [defaultValue, setLocalStorageState])

  // Sync localStorage with defaultValue at start
  useEffect(() => {
    localStorage.setItem(getLocalStorageKey(), JSON.stringify(state))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [state, setLocalStorageState, resetLocalStorageState] as const
}

export default usePersistedState
