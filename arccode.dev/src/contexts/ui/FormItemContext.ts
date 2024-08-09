import { createContext } from 'react'

type FormItemContextValue = {
  id: string
}

export default createContext<FormItemContextValue>({} as FormItemContextValue)
