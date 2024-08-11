import { doc } from 'firebase/firestore'
import { type PropsWithChildren, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { User } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import { db } from '~firebase'

import CharacterContext from '~contexts/character/CharacterContext'

import useDocument from '~hooks/db/useDocument'
import useUser from '~hooks/user/useUser'

import NotFound from '~components/common/NotFound'
import SpinnerCentered from '~components/common/CenteredSpinner'

function CharacterProvider({ children }: PropsWithChildren) {
  const { user: currentUser } = useUser()
  const { userId } = useParams()

  const d = useMemo(() => doc(db, 'users', userId ?? NULL_DOCUMENT_ID), [userId])
  const { data: user, loading, error } = useDocument<User>(d, !!userId)
  const finalUser = userId ? user : currentUser

  if (loading) {
    return (
      <SpinnerCentered />
    )
  }

  if (error) {
    return (
      <div>
        An error occurred
      </div>
    )
  }

  if (!finalUser) {
    return (
      <NotFound />
    )
  }

  return (
    <CharacterContext.Provider value={finalUser.character}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterProvider
