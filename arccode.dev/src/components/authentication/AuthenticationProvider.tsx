import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  type User as Viewer,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc } from 'firebase/firestore'
import LogRocket from 'logrocket'

import type { SignInProvider, User } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import {
  auth,
  db,
  logAnalytics,
  persistancePromise,
} from '~firebase'

import UserContext, { type UserContextType } from '~contexts/authentication/UserContext'

import useLiveDocument from '~hooks/db/useLiveDocument'

import createUser from '~utils/db/createUser'

import ErrorOccured from '~components/common/ErrorOccured'

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
      nUpdates: increment(1),
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

    onAuthStateChanged(auth, async viewer => {
      setViewer(viewer)
      setLoadingAuthentication(false)
      logAnalytics(viewer ? 'signin' : 'signout')
    })
  }, [])

  const handleCreateUser = useCallback(async () => {
    if (!viewer) return
    if (loading || user) return

    const existingUser = await getDoc(userDocument)

    if (existingUser.exists()) return

    const signInProvider = viewer.providerData[0].providerId as SignInProvider
    const createdUser = createUser({
      id: viewer.uid,
      userId: viewer.uid,
      email: viewer.email ?? '',
      name: viewer.displayName ?? '',
      imageUrl: viewer.photoURL ?? '',
      signInProviders: [signInProvider],
    })

    await setDoc(userDocument, createdUser)

    logAnalytics('signup', {
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

    const updatedUser: Partial<Record<keyof User, any>> = {}
    const signInProviders = viewer.providerData.map(x => x.providerId as SignInProvider).sort()
    const timezoneOffset = new Date().getTimezoneOffset()

    if (viewer.email !== user.email) updatedUser.email = viewer.email
    if (viewer.photoURL && viewer.photoURL !== user.imageUrl) updatedUser.imageUrl = viewer.photoURL
    if (user.signInProviders.length !== signInProviders.length || user.signInProviders.some((x, i) => x !== signInProviders[i])) updatedUser.signInProviders = signInProviders
    if (user.timezoneOffset !== timezoneOffset) updatedUser.timezoneOffset = timezoneOffset

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

  // Update sign in providers and other user data
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
      <ErrorOccured
        source="AuthenticationProvider"
        message={error.message}
      />
    )
  }

  return (
    <UserContext.Provider value={viewerContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthenticationProvider
