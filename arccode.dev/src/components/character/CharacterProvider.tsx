import { doc } from 'firebase/firestore'
import { type PropsWithChildren, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { type Character, User } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import { db } from '~firebase'

import CharacterContext, { CharacterContextType } from '~contexts/character/CharacterContext'

import useDocument from '~hooks/db/useDocument'
import useUser from '~hooks/user/useUser'

import NotFound from '~components/common/NotFound'
import SpinnerCentered from '~components/common/CenteredSpinner'

function CharacterProvider({ children }: PropsWithChildren) {
  const { user: currentUser, updateUser } = useUser()
  const { userId } = useParams()

  const d = useMemo(() => doc(db, 'users', userId ?? NULL_DOCUMENT_ID), [userId])
  const { data: user, loading, error } = useDocument<User>(d, !!userId)
  const finalUser = userId && userId !== currentUser?.id ? user : currentUser
  const character = useMemo(() => finalUser?.character ?? {} as Character, [finalUser])
  const isEditable = currentUser?.id === finalUser?.id

  const updateCharacter = useCallback(async (payload: Record<string, any>) => {
    if (!finalUser?.id || currentUser?.id !== finalUser.id) return

    const finalPayload = Object.fromEntries(Object.entries(payload).map(([key, value]) => [`character.${key}`, value]))

    await updateUser(finalPayload)
  }, [
    finalUser?.id,
    currentUser?.id,
    updateUser,
  ])

  const characterContextValue = useMemo<CharacterContextType>(() => ({
    character,
    isEditable,
    updateCharacter,
  }), [
    character,
    isEditable,
    updateCharacter,
  ])

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
    <CharacterContext.Provider value={characterContextValue}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterProvider
