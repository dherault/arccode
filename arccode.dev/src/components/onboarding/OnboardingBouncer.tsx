import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

function OnboardingBouncer({ children }: PropsWithChildren) {
  const { user } = useUser()

  if (!user?.name) {
    return (
      <Navigate
        replace
        to="/onboarding/start-adventure"
      />
    )
  }

  if (!user.hasConnectedExtension) {
    return (
      <Navigate
        replace
        to="/onboarding/install-extension"
      />
    )
  }

  return children as JSX.Element
}

export default OnboardingBouncer
