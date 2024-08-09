import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SignInProvider, type User } from '~types'

import { AUTHENTICATION_ERRORS } from '~constants'

import { auth, db, githubProvider, googleProvider, logAnalytics } from '~firebase'

import createUser from '~utils/db/createUser'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/Form'
import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'
import { Label } from '~components/ui/Label'
import Divider from '~components/common/Divider'
import SocialButton from '~components/authentication/SocialButton'

const emailFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'You must input an email' })
    .email('Please enter a valid email')
    .trim()
    .toLowerCase(),
})

const passwordsFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters' })
    .max(100, { message: 'Your password must be at most 100 characters' }),
  passwordConfirmation: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters' })
    .max(100, { message: 'Your password must be at most 100 characters' }),
})
.refine(data => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ['passwordConfirmation'],
})

const passwordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters' })
    .max(100, { message: 'Your password must be at most 100 characters' }),
})

const MODES = {
  START: 0,
  LOGIN: 1,
  SIGNUP: 2,
}

function Authentication() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(MODES.START)
  const [providers, setProviders] = useState<SignInProvider[]>([])

  const error = AUTHENTICATION_ERRORS[errorCode as keyof typeof AUTHENTICATION_ERRORS] ?? (errorCode ? AUTHENTICATION_ERRORS.default : null)

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const passwordsForm = useForm<z.infer<typeof passwordsFormSchema>>({
    resolver: zodResolver(passwordsFormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: '',
    },
  })

  const handleEmailSubmit = useCallback(async (values: z.infer<typeof emailFormSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)
    setProviders([])

    const data = await getDocs(query(collection(db, 'users'), where('email', '==', values.email)))

    setLoading(false)

    if (data.empty) {
      setMode(MODES.SIGNUP)

      return
    }

    const user = data.docs[0].data() as User

    setProviders(user.signInProviders)
    setMode(MODES.LOGIN)
  }, [
    loading,
  ])

  const handleSignupSubmit = useCallback((values: z.infer<typeof passwordsFormSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)

    const email = emailForm.getValues().email.trim().toLowerCase()

    createUserWithEmailAndPassword(auth, email, values.password)
      .then(async userCredential => {
        const user = createUser({
          id: userCredential.user.uid,
          name: '',
          email,
          userId: userCredential.user.uid,
          signInProviders: ['password'],
        })

        await setDoc(doc(db, 'users', user.id), user)

        logAnalytics('sign_up', {
          method: 'email',
        })
      })
      .catch(error => {
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [
    loading,
    emailForm,
  ])

  const handleLoginSubmit = useCallback((values: z.infer<typeof passwordFormSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)

    const email = emailForm.getValues().email.trim().toLowerCase()

    signInWithEmailAndPassword(auth, email, values.password)
      .then(() => {
        logAnalytics('login', {
          method: 'email',
        })
      })
      .catch(error => {
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [
    loading,
    emailForm,
  ])

  const handleBack = useCallback(() => {
    setMode(MODES.START)
    setProviders([])
  }, [])

  return (
    <>
      {mode === MODES.LOGIN && providers.includes('google') && (
        <>
          <Label className="mt-8 block text-center">
            Hi
            {' '}
            {emailForm.getValues().email}
            !
          </Label>
          <Label className="mt-2 -mb-4 block text-center">
            Use your Google account to continue
          </Label>
        </>
      )}
      {(mode === MODES.START || providers.includes('google')) && (
        <>
          <SocialButton
            signInProvider="google"
            firebaseAuthProvider={googleProvider}
            logoSrc="/images/google-logo.png"
            className="mt-8"
          >
            Continue with Google
          </SocialButton>
          <SocialButton
            signInProvider="github"
            firebaseAuthProvider={githubProvider}
            logoSrc="/images/github-logo.svg"
            className="mt-2"
          >
            Continue with GitHub
          </SocialButton>
          {(mode === MODES.START || providers.includes('password')) && (
            <Divider className="mt-8">
              or
            </Divider>
          )}
        </>
      )}
      {mode === MODES.START && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="space-y-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@company.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Continue
            </Button>
          </form>
        </Form>
      )}
      {mode === MODES.SIGNUP && (
        <>
          <div className="mt-8 text-center">
            Signin up as
          </div>
          <div className="mb-4 text-center">
            {emailForm.getValues().email}
          </div>
          <Form {...passwordsForm}>
            <form
              onSubmit={passwordsForm.handleSubmit(handleSignupSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordsForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordsForm.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password confirmation
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="off"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                Sign up
              </Button>
            </form>
          </Form>
        </>
      )}
      {mode === MODES.LOGIN && providers.includes('password') && (
        <>
          <div className="mt-8 text-center">
            Login in as
          </div>
          <div className="mb-4 text-center">
            {emailForm.getValues().email}
          </div>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handleLoginSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                Log in
              </Button>
            </form>
          </Form>
        </>
      )}
      {!!error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
          {error === AUTHENTICATION_ERRORS.default && (
            <>
              <br />
              {errorCode}
            </>
          )}
        </p>
      )}
      <div className="mt-4 flex justify-between gap-4">
        {mode !== MODES.START && (
          <p
            className="text-sm font-light text-gray-600 dark:text-gray-400 hover:underline cursor-pointer"
            onClick={handleBack}
          >
            Back
          </p>
        )}
        {mode === MODES.LOGIN && providers.includes('password') && (
          <p className="text-sm font-light text-gray-600 dark:text-gray-400">
            Forgot your password?
            {' '}
            <Link
              to="/authentication/password-reset"
              className="link"
            >
              Reset it
            </Link>
          </p>
        )}
      </div>
    </>
  )
}

export default Authentication
