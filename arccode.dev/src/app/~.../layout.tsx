import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import CharacterProvider from '~components/character/CharacterProvider'
import OnboardingBouncer from '~components/onboarding/OnboardingBouncer'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <OnboardingBouncer>
        <CharacterProvider>
          {children}
        </CharacterProvider>
      </OnboardingBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
