function useLocalStorageValue<T>(key: string, defaultValue: T) {
  let value = defaultValue

  try {
    value = JSON.parse(localStorage.getItem(key) ?? '') as T
  }
  catch (error) {
    //
  }

  return value
}

export default useLocalStorageValue
