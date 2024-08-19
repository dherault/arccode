import type { PropsWithChildren } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MailCheck } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '~components/ui/Alert'
import AuthenticationRedirect from '~components/authentication/AuthenticationRedirect'
import Logo from '~components/common/logos/Logo'

function AuthenticationLayout({ children }: PropsWithChildren) {
  const [searchParams] = useSearchParams()
  const passwordResetSuccess = searchParams.get('password-reset')

  return (
    <AuthenticationRedirect>
      <div className="py-8 md:py-16 px-4 flex flex-col items-center">
        <Link to="/">
          <div className="flex items-center justify-center text-blue">
            <Logo className="w-12" />
          </div>
          <h1 className="mt-2 text-3xl text-center font-semibold text-blue">
            Arccode
          </h1>
        </Link>
        <div className="mt-1 px-0 container max-w-[384px]">
          {passwordResetSuccess && (
            <Alert
              className="mb-4"
              variant="success"
            >
              <MailCheck className="w-4" />
              <AlertTitle>
                Password reset
              </AlertTitle>
              <AlertDescription>
                Check your emails for a password reset link
              </AlertDescription>
            </Alert>
          )}
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </AuthenticationRedirect>
  )
}

export default AuthenticationLayout
