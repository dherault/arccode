import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import OnboardingBouncer from '~components/onboarding/OnboardingBouncer'
import CharacterProvider from '~components/character/CharacterProvider'
import AppLayout from '~components/common/AppLayout'
import CharacterLayout from '~components/character/CharacterLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <OnboardingBouncer>
        <CharacterProvider>
          <AppLayout>
            <CharacterLayout>
              {children}
            </CharacterLayout>
          </AppLayout>
        </CharacterProvider>
      </OnboardingBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
