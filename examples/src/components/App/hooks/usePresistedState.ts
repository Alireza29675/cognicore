import { useState, useEffect } from 'react'

const usePersistedState = <T>(key: string, initialState: T) => {
  const [state, setState] = useState((() => {
    const storageValue = localStorage.getItem(key)

    if (storageValue) {
      return JSON.parse(storageValue) as T
    } else {
      return initialState
    }
  })());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state]);

  return [state, setState] as const
}

export default usePersistedState
