import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import OnboardingBouncer from '~components/onboarding/OnboardingBouncer'
import CharacterProvider from '~components/character/CharacterProvider'
import AppLayout from '~components/common/AppLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <OnboardingBouncer>
        <CharacterProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </CharacterProvider>
      </OnboardingBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
