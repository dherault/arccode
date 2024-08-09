import { useContext } from 'react'

import ReferenceContext from '~contexts/reference/ReferenceContext'

function useReference() {
  return useContext(ReferenceContext)
}

export default useReference
