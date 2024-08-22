import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type FormEvent, useCallback, useMemo, useState } from 'react'
import { updatePassword } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { AUTHENTICATION_ERRORS } from '~constants'

import { db } from '~firebase'

import useUser from '~hooks/user/useUser'

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

const passwordFormSchema = z.object({
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

function Account() {
  const { user, viewer, updateUser } = useUser()

  const [name, setName] = useState(user?.character.name ?? '')
  const [nameLoading, setNameLoading] = useState(false)
  const [nameValid, setNameValid] = useState(true)
  const [nameSuccess, setNameSuccess] = useState(false)

  const nameQuery = useMemo(() => query(collection(db, 'users'), where('character.name', '==', name.trim())), [name])

  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordErrorCode, setPasswordErrorCode] = useState<string | null>(null)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const passwordError = AUTHENTICATION_ERRORS[passwordErrorCode as keyof typeof AUTHENTICATION_ERRORS] ?? (passwordErrorCode ? AUTHENTICATION_ERRORS.default : null)

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleNameSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (nameLoading) return

    const finalName = name.trim()

    if (!finalName) return
    if (finalName === user?.character.name) {
      setNameValid(true)

      return
    }

    setNameLoading(true)
    setNameSuccess(false)

    const docs = await getDocs(nameQuery)

    if (!docs.empty) {
      setNameLoading(false)
      setNameValid(false)

      return
    }

    setNameValid(true)

    await updateUser({
      'character.name': finalName,
    })

    setNameLoading(false)
    setNameSuccess(true)
  }, [
    user?.character.name,
    name,
    nameLoading,
    nameQuery,
    updateUser,
  ])

  const handlePasswordSubmit = useCallback(async (values: z.infer<typeof passwordFormSchema>) => {
    if (passwordLoading) return
    if (!viewer) return

    setPasswordSuccess(false)
    setPasswordErrorCode(null)
    setPasswordLoading(true)

    try {
      await updatePassword(viewer, values.password)

      setPasswordSuccess(true)

      passwordForm.reset()
    }
    catch (error: any) {
      setPasswordErrorCode(error.code)
    }

    setPasswordLoading(false)
  }, [
    passwordLoading,
    viewer,
    passwordForm,
  ])

  if (!user) return null

  return (
    <div className="container space-y-8">
      <h1 className="-mb-4 text-3xl font-semibold">
        Account
      </h1>
      <section>
        <form
          onSubmit={handleNameSubmit}
          className="w-full md:w-fit space-y-4"
        >
          <div className="space-y-2">
            <Label>
              Character name
            </Label>
            <Input
              placeholder={user.character.name}
              value={name}
              onChange={event => setName(event.target.value)}
              className="w-full md:w-auto md:min-w-[300px]"
            />
          </div>
          <div className="md:flex items-center gap-2">
            <Button type="submit">
              Change character name
            </Button>
            {!nameValid && (
              <div className="mt-2 md:mt-0 text-red-500 text-sm">
                Name already taken
              </div>
            )}
            {nameSuccess && (
              <div className="mt-2 md:mt-0 text-green-500 text-sm">
                Character name changed successfully!
              </div>
            )}
          </div>
        </form>
      </section>
      {user.signInProviders.includes('password') && (
        <section>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="w-full md:w-fit space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full md:w-auto md:min-w-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New password confirmation
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="off"
                        placeholder="••••••••"
                        className="w-full md:w-auto md:min-w-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:flex items-center gap-2">
                <Button
                  type="submit"
                  loading={passwordLoading}
                >
                  Change password
                </Button>
                {passwordSuccess && (
                  <div className="mt-2 md:mt-0 text-green-500 text-sm">
                    Password changed successfully!
                  </div>
                )}
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-500">
                  {passwordError}
                  {passwordError === AUTHENTICATION_ERRORS.default && (
                    <>
                      <br />
                      {passwordErrorCode}
                    </>
                  )}
                </p>
              )}
            </form>
          </Form>
        </section>
      )}
    </div>
  )
}

export default Account
