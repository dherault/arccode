import { doc } from 'firebase/firestore'
import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import cloneDeep from 'lodash.clonedeep'
import { httpsCallable } from 'firebase/functions'

import { type Character, type KeywordRegistry, User } from '~types'

import { LEVEL_UP_SEARCH_PARAMETERS_KEY, NULL_DOCUMENT_ID } from '~constants'

import { db, functions } from '~firebase'

import countKeywordRegistry from '~logic/countKeywordRegistry'

import CharacterContext, { CharacterContextType } from '~contexts/character/CharacterContext'

import useDocument from '~hooks/db/useDocument'
import useUser from '~hooks/user/useUser'
import { useToast } from '~hooks/ui/useToast'

import NotFound from '~components/common/NotFound'
import SpinnerCentered from '~components/common/CenteredSpinner'

function CharacterProvider({ children }: PropsWithChildren) {
  const { user: currentUser, updateUser } = useUser()
  const { toast } = useToast()
  const { userId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [levelUpsKeywords, setLevelUpsKeywords] = useState<KeywordRegistry>({})
  const [levelUpsCursor, setLevelUpsCursor] = useState(0)

  const d = useMemo(() => doc(db, 'users', userId ?? NULL_DOCUMENT_ID), [userId])
  const { data: user, loading, error } = useDocument<User>(d, !!userId)
  const finalUser = userId && userId !== currentUser?.id ? user : currentUser
  const character = useMemo(() => finalUser?.character ?? {} as Character, [finalUser])
  const isEditable = currentUser?.id === finalUser?.id
  const levelUpsCount = countKeywordRegistry(levelUpsKeywords)

  const updateCharacter = useCallback(async (payload: Record<string, any>) => {
    if (!finalUser?.id || currentUser?.id !== finalUser.id) return

    const finalPayload = Object.fromEntries(Object.entries(payload).map(([key, value]) => [`character.${key}`, value]))

    await updateUser(finalPayload)
  }, [
    finalUser?.id,
    currentUser?.id,
    updateUser,
  ])

  const updateLevelUpsKeywords = useCallback((n: number) => {
    const nextLevelUpsKeywords: KeywordRegistry = {}
    const currentLevelUpsKeywords = cloneDeep(character.levelUpsKeywords)

    for (let i = 0; i < n; i++) {
      const firstLanguage = Object.keys(currentLevelUpsKeywords)[0]

      if (!firstLanguage) break

      const firstKeyword = Object.keys(currentLevelUpsKeywords[firstLanguage])[0]

      if (!firstKeyword) {
        delete currentLevelUpsKeywords[firstLanguage]
        i--

        continue
      }

      currentLevelUpsKeywords[firstLanguage][firstKeyword]--

      if (currentLevelUpsKeywords[firstLanguage][firstKeyword] <= 0) delete currentLevelUpsKeywords[firstLanguage][firstKeyword]
      if (!nextLevelUpsKeywords[firstLanguage]) nextLevelUpsKeywords[firstLanguage] = {}
      if (!nextLevelUpsKeywords[firstLanguage][firstKeyword]) nextLevelUpsKeywords[firstLanguage][firstKeyword] = 0

      nextLevelUpsKeywords[firstLanguage][firstKeyword]++
    }

    setLevelUpsKeywords(nextLevelUpsKeywords)
  }, [
    character.levelUpsKeywords,
    setLevelUpsKeywords,
  ])

  const handleToggleLevelUp = useCallback(() => {
    setSearchParams(x => {
      if (x.has(LEVEL_UP_SEARCH_PARAMETERS_KEY)) x.delete(LEVEL_UP_SEARCH_PARAMETERS_KEY)
      else x.set(LEVEL_UP_SEARCH_PARAMETERS_KEY, '1')

      return x
    })
  }, [
    setSearchParams,
  ])

  const handleOpenChest = useCallback(async () => {
    try {
      const levelUp = httpsCallable(functions, 'levelUp')

      await levelUp({ levelUpsKeywords })
    }
    catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error leveling up',
        description: error.message,
      })
    }
  }, [
    levelUpsKeywords,
    toast,
  ])

  const handleCloseChest = useCallback(async () => {
    setLevelUpsCursor(x => x + 1)
  }, [])

  const characterContextValue = useMemo<CharacterContextType>(() => ({
    character,
    isEditable,
    updateCharacter,
    isLevelUpOpen: searchParams.has(LEVEL_UP_SEARCH_PARAMETERS_KEY),
    toggleLevelUp: handleToggleLevelUp,
    levelUpsKeywords,
    updateLevelUpsKeywords,
    levelUpsCursor,
    levelUpsCount,
    openChest: handleOpenChest,
    closeChest: handleCloseChest,
  }), [
    character,
    isEditable,
    searchParams,
    levelUpsKeywords,
    levelUpsCursor,
    levelUpsCount,
    updateCharacter,
    handleToggleLevelUp,
    updateLevelUpsKeywords,
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
