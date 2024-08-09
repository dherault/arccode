import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import OnboardingBouncer from '~components/onboarding/OnboardingBouncer'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <OnboardingBouncer>
        {children}
      </OnboardingBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
