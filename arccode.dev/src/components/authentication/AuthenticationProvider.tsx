import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User as Viewer, onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import LogRocket from 'logrocket'

import type { SignInProvider, User } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import { auth, db, logAnalytics, persistancePromise } from '~firebase'

import UserContext, { type UserContextType } from '~contexts/authentication/UserContext'

import useLiveDocument from '~hooks/db/useLiveDocument'

import createUser from '~utils/db/createUser'

function AuthenticationProvider({ children }: PropsWithChildren) {
  const [viewer, setViewer] = useState<Viewer | null>(null)

  const userId = useMemo(() => viewer?.uid ?? '', [viewer?.uid])
  const userDocument = useMemo(() => doc(db, 'users', userId || NULL_DOCUMENT_ID), [userId])

  const { data: user, error, loading } = useLiveDocument<User>(userDocument, !!userId)

  const [loadingAuthentication, setLoadingAuthentication] = useState(true)

  const navigate = useNavigate()

  const handleUpdateUser = useCallback(async (payload: Record<string, any>) => {
    if (!userId) return

    console.groupCollapsed('--> Updating user')
    console.log(payload)
    console.groupEnd()

    await updateDoc(userDocument, {
      ...payload,
      updatedAt: new Date().toISOString(),
    })
  }, [
    userId,
    userDocument,
  ])

  const handleSignOut = useCallback(async () => {
    setViewer(null)

    await signOut(auth)

    navigate('/')
  }, [
    navigate,
  ])

  const handleAuthenticationStateChange = useCallback(async () => {
    await persistancePromise

    onAuthStateChanged(auth, async (viewer: Viewer | null) => {
      setViewer(viewer)
      setLoadingAuthentication(false)
      logAnalytics(viewer ? 'signin' : 'signout')
    })
  }, [])

  const handleCreateUser = useCallback(async () => {
    if (!viewer) return
    if (loading || user) return

    const signInProvider = viewer.providerData[0].providerId as SignInProvider
    const createdUser = createUser({
      email: viewer.email ?? '',
      id: viewer.uid,
      userId: viewer.uid,
      imageUrl: viewer.photoURL ?? '',
      signInProviders: [signInProvider],
    })

    await setDoc(userDocument, createdUser)

    logAnalytics('sign_up', {
      method: signInProvider,
    })
  }, [
    viewer,
    user,
    loading,
    userDocument,
  ])

  const handleUpdateUserData = useCallback(async () => {
    if (!(viewer && user)) return

    const updatedUser: Record<string, any> = {}
    const signInProviders = viewer.providerData.map(x => x.providerId as SignInProvider).sort()

    if (viewer.email !== user.email) updatedUser.email = viewer.email
    if (viewer.photoURL && viewer.photoURL !== user.imageUrl) updatedUser.imageUrl = viewer.photoURL
    if (user.signInProviders.length !== signInProviders.length || user.signInProviders.some((x, i) => x !== signInProviders[i])) updatedUser.signInProvider = signInProviders

    if (!Object.entries(updatedUser).length) return

    await handleUpdateUser(updatedUser)
  }, [
    viewer,
    user,
    handleUpdateUser,
  ])

  const handleFirstTimeUser = useCallback(async () => {
    if (!viewer) return
    if (!user || user.hasSentSignupMessages) return

    // sendSignupEmail(user)

    if (import.meta.env.PROD && user.signInProviders.includes('password')) {
      sendEmailVerification(viewer)
    }

    await handleUpdateUser({
      hasSentSignupMessages: true,
    })
  }, [
    viewer,
    user,
    handleUpdateUser,
  ])

  // Listen for auth change
  useEffect(() => {
    handleAuthenticationStateChange()
  }, [
    handleAuthenticationStateChange,
  ])

  useEffect(() => {
    handleCreateUser()
  }, [
    handleCreateUser,
  ])

  // Update sign in providers
  useEffect(() => {
    handleUpdateUserData()
  }, [
    handleUpdateUserData,
  ])

  // Handle first-time user
  useEffect(() => {
    handleFirstTimeUser()
  }, [
    handleFirstTimeUser,
  ])

  // Identify Logrocket user
  useEffect(() => {
    if (!user || !import.meta.env.PROD) return

    LogRocket.identify(user.id, {
      name: user.name,
      email: user.email,
    })
  }, [user])

  const viewerContextValue = useMemo<UserContextType>(() => ({
    viewer,
    user,
    loading: loading || loadingAuthentication,
    updateUser: handleUpdateUser,
    signOut: handleSignOut,
  }), [
    viewer,
    user,
    loading,
    loadingAuthentication,
    handleUpdateUser,
    handleSignOut,
  ])

  if (error) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        An error occured
      </div>
    )
  }

  return (
    <UserContext.Provider value={viewerContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthenticationProvider
