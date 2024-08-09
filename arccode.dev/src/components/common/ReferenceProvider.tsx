import { type PropsWithChildren, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { logAnalytics } from '~firebase'

import ReferenceContext from '~contexts/reference/ReferenceContext'

import usePersistedState from '~hooks/common/usePersistedState'

function ReferenceProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [reference, setReference] = usePersistedState('reference', '')

  useEffect(() => {
    if (!searchParams.has('ref')) return

    const reference = searchParams.get('ref') ?? ''

    if (!reference) return

    setReference(reference)

    setSearchParams(sp => {
      sp.delete('ref')

      return sp
    })

    logAnalytics('reference', {
      reference,
    })
  }, [
    searchParams,
    setSearchParams,
    setReference,
  ])

  return (
    <ReferenceContext.Provider value={reference}>
      {children}
    </ReferenceContext.Provider>
  )
}

export default ReferenceProvider
