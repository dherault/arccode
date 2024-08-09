import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User as Viewer, onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import LogRocket from 'logrocket'

import type { SignInProvider, User } from '~types'

import { auth, db, persistancePromise } from '~firebase'

import UserContext, { type UserContextType } from '~contexts/authentication/UserContext'

import sendSignupEmail from '~emails/signup'

function AuthenticationProvider({ children }: PropsWithChildren) {
  const [viewer, setViewer] = useState<Viewer | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loadingAuthentication, setLoadingAuthentication] = useState(true)

  const navigate = useNavigate()

  const handleUpdateUser = useCallback(async (updatedUser: Partial<User>) => {
    if (!user) return

    const updatedAt = new Date().toISOString()

    setUser(x => x ? { ...x, ...updatedUser, updatedAt } : null)

    await updateDoc(doc(db, 'users', user.id), { ...updatedUser, updatedAt })
  }, [user])

  const handleSignIn = useCallback(async (viewer: Viewer, user: User) => {
    setViewer(viewer)
    setUser(user)
  }, [])

  const handleSignOut = useCallback(async () => {
    setUser(null)
    setViewer(null)

    await signOut(auth)

    navigate('/')
  }, [navigate])

  const handleAuthenticationStateChange = useCallback(async () => {
    await persistancePromise

    onAuthStateChanged(auth, async (viewer: Viewer | null) => {
      if (viewer) {
        const result = await getDoc(doc(db, 'users', viewer.uid))
        const user = result.data() as User

        if (!user) {
          setLoadingAuthentication(false)

          return
        }

        const signInProvider = viewer.providerData[0].providerId as SignInProvider

        if (!user.signInProviders.includes(signInProvider)) {
          user.signInProviders.push(signInProvider)
        }

        await handleSignIn(viewer, user)
      }

      setLoadingAuthentication(false)
    })
  }, [handleSignIn])

  // Listen for auth change
  useEffect(() => {
    handleAuthenticationStateChange()
  }, [handleAuthenticationStateChange])

  // Handle first-time user
  useEffect(() => {
    if (!viewer) return
    if (!user || user.signupMessagesSent) return

    sendSignupEmail(user)

    if (import.meta.env.PROD && user.signInProviders.includes('password')) {
      sendEmailVerification(viewer)
    }

    handleUpdateUser({ signupMessagesSent: true })
  }, [
    user,
    viewer,
    handleUpdateUser,
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
    loadingAuthentication,
    updateUser: handleUpdateUser,
    signIn: handleSignIn,
    signOut: handleSignOut,
  }), [
    viewer,
    user,
    loadingAuthentication,
    handleUpdateUser,
    handleSignIn,
    handleSignOut,
  ])

  return (
    <UserContext.Provider value={viewerContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthenticationProvider
