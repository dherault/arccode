import { type ButtonHTMLAttributes, useCallback, useState } from 'react'
import { type AuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import _ from 'clsx'

import type { SignInProvider, User } from '~types'

import { auth, db, logAnalytics } from '~firebase'

import useUser from '~hooks/user/useUser'

import createUser from '~utils/db/createUser'

import { Button } from '~components/ui/Button'
import Spinner from '~components/common/Spinner'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  signInProvider: SignInProvider
  firebaseAuthProvider: AuthProvider
  logoSrc: string
}

function SocialButton({
  signInProvider,
  firebaseAuthProvider,
  logoSrc,
  children,
  className,
  ...props
}: Props) {
  const { signIn } = useUser()

  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setLoading(true)

    signInWithPopup(auth, firebaseAuthProvider)
      .then(async result => {
        const { user } = result

        if (!user) {
          setLoading(false)

          return
        }

        const docRef = doc(db, 'users', user.uid)

        const fetchResult = await getDoc(docRef)

        if (fetchResult.exists()) {
          logAnalytics('login', {
            method: signInProvider,
          })

          const fetchedUser = fetchResult.data() as User
          const updatedUser: Partial<User> = {
            email: user.email ?? fetchedUser.email ?? '',
            name: user.displayName ?? fetchedUser.name ?? '',
            updatedAt: new Date().toISOString(),
            signInProviders: fetchedUser.signInProviders.includes(signInProvider)
              ? fetchedUser.signInProviders
              : [...fetchedUser.signInProviders, signInProvider],
          }

          await updateDoc(docRef, updatedUser)
          await signIn(user, { ...fetchedUser, ...updatedUser })
        }
        else {
          logAnalytics('sign_up', {
            method: signInProvider,
          })

          const createdUser = createUser({
            id: user.uid,
            name: user.displayName ?? '',
            email: user.email ?? '',
            userId: user.uid,
            signInProviders: [signInProvider],
          })

          createdUser.imageUrl = user.photoURL ?? ''

          await setDoc(docRef, createdUser)
          await signIn(user, createdUser)
        }
      })
      .catch(error => {
        console.error(error.code)

        setLoading(false)
      })
  }, [
    signInProvider,
    firebaseAuthProvider,
    signIn,
  ])

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={_('w-full bg-white hover:bg-gray-100 text-gray-900 border elevation-1', className)}
    >
      {loading && (
        <Spinner className="w-6 h-6" />
      )}
      {!loading && (
        <img
          src={logoSrc}
          alt={signInProvider}
          className="w-6 h-6"
        />
      )}
      <div className="ml-3">
        {children}
      </div>
    </Button>
  )
}

export default SocialButton
