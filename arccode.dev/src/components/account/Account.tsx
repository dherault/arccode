import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { updatePassword } from 'firebase/auth'

import { AUTHENTICATION_ERRORS } from '~constants'

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
  const { user, viewer } = useUser()
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

  const handlePasswordSubmit = useCallback(async (values: z.infer<typeof passwordFormSchema>) => {
    if (passwordLoading) return
    if (!viewer) return

    setPasswordSuccess(false)
    setPasswordErrorCode(null)
    setPasswordLoading(true)

    try {
      await updatePassword(viewer, values.password)

      setPasswordSuccess(true)
    }
    catch (error: any) {
      setPasswordErrorCode(error.code)
    }

    setPasswordLoading(false)
  }, [
    passwordLoading,
    viewer,
  ])

  if (!user) return null

  return (
    <div className="container space-y-4">
      <h1 className="text-3xl font-semibold">
        Account
      </h1>
      {user.signInProviders.includes('password') && (
        <section>
          <div className="w-fit">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
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
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className="md:min-w-[300px]"
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
                        Password confirmation
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="off"
                          placeholder="••••••••"
                          className="md:min-w-[300px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    loading={passwordLoading}
                  >
                    Change password
                  </Button>
                  {passwordSuccess && (
                    <div className="text-green-500 text-sm">
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
          </div>
        </section>
      )}
    </div>
  )
}

export default Account
