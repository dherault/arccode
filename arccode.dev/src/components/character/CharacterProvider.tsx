import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { pickLevelUpKeywordRegistry, sumKeywordRegistry } from 'arccode-core'

import { User } from '~types'

import { LEVEL_UP_SEARCH_PARAMETERS_KEY, NULL_DOCUMENT_ID } from '~constants'

import { db, functions } from '~firebase'

import CharacterContext, { CharacterContextType } from '~contexts/character/CharacterContext'

import useDocument from '~hooks/db/useDocument'
import useUser from '~hooks/user/useUser'
import { useToast } from '~hooks/ui/useToast'
import usePrevious from '~hooks/common/usePrevious'

import NotFound from '~components/common/NotFound'
import SpinnerCentered from '~components/common/CenteredSpinner'
import ErrorOccured from '~components/common/ErrorOccured'

const levelUp = httpsCallable(functions, 'levelUp')

function CharacterProvider({ children }: PropsWithChildren) {
  const { user: currentUser, updateUser } = useUser()
  const { toast } = useToast()
  const { userId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  /* ---
    Character
  --- */

  const d = useMemo(() => doc(db, 'users', userId ?? NULL_DOCUMENT_ID), [userId])
  const { data: user, loading, error } = useDocument<User>(d, !!userId)
  const finalUser = userId && userId !== currentUser?.id ? user : currentUser
  const character = useMemo(() => finalUser?.character ?? null, [finalUser])
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

  /* ---
    Level up
  --- */

  const [nLevelUpToOpen, setNLevelUpToOpen] = useState(1)
  const [levelUpCursor, setLevelUpCursor] = useState(0)
  const levelUpKeywordRegistry = useMemo(() => character ? pickLevelUpKeywordRegistry(character, nLevelUpToOpen) : {}, [character, nLevelUpToOpen])
  const levelUpCount = useMemo(() => sumKeywordRegistry(levelUpKeywordRegistry), [levelUpKeywordRegistry])
  const levelUpMax = useMemo(() => character ? sumKeywordRegistry(character.levelUpKeywordRegistry) : 0, [character])
  const previousUnlockedItems = usePrevious(character?.unlockedItems ?? {})
  const levelUpUnlockedItems = useMemo(() => {
    const levelUpsUnlockedItems: Record<string, number> = {}

    Object.entries(character?.unlockedItems ?? {}).forEach(([itemId, count]) => {
      const diffCount = count - (previousUnlockedItems[itemId] ?? 0)

      if (diffCount <= 0) return

      levelUpsUnlockedItems[itemId] = diffCount
    })

    return levelUpsUnlockedItems
  }, [
    character?.unlockedItems,
    previousUnlockedItems,
  ])

  const handleToggleLevelUp = useCallback(() => {
    setSearchParams(x => {
      if (x.has(LEVEL_UP_SEARCH_PARAMETERS_KEY)) x.delete(LEVEL_UP_SEARCH_PARAMETERS_KEY)
      else x.set(LEVEL_UP_SEARCH_PARAMETERS_KEY, '1')

      return x
    }, {
      replace: true,
    })
  }, [
    setSearchParams,
  ])

  const handleOpenChest = useCallback(async () => {
    try {
      await levelUp({ levelUpKeywordRegistry })
    }
    catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error leveling up',
        description: error.message,
      })
    }
  }, [
    levelUpKeywordRegistry,
    toast,
  ])

  const handleCloseChest = useCallback(async () => {
    setLevelUpCursor(x => x + 1)

    if (levelUpCount >= levelUpMax) handleToggleLevelUp()
  }, [
    levelUpCount,
    levelUpMax,
    handleToggleLevelUp,
  ])

  /* ---
    Context value
  --- */

  const characterContextValue = useMemo<CharacterContextType>(() => ({
    character: character!,
    isEditable,
    updateCharacter,
    isLevelUpOpen: searchParams.has(LEVEL_UP_SEARCH_PARAMETERS_KEY),
    toggleLevelUp: handleToggleLevelUp,
    levelUpKeywordRegistry,
    updateLevelUpKeywordRegistry: setNLevelUpToOpen,
    levelUpCursor,
    levelUpCount,
    levelUpMax,
    levelUpUnlockedItems,
    openChest: handleOpenChest,
    closeChest: handleCloseChest,
  }), [
    character,
    isEditable,
    searchParams,
    levelUpKeywordRegistry,
    levelUpCursor,
    levelUpCount,
    levelUpMax,
    levelUpUnlockedItems,
    updateCharacter,
    handleToggleLevelUp,
    handleOpenChest,
    handleCloseChest,
  ])

  if (loading) {
    return (
      <SpinnerCentered />
    )
  }

  if (error) {
    return (
      <ErrorOccured
        source="CharacterProvider"
        message={error.message}
      />
    )
  }

  if (!character) {
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
