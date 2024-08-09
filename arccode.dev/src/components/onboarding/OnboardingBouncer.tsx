import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

function OnboardingBouncer({ children }: PropsWithChildren) {
  const { user } = useUser()

  if (!user?.onboarded) {
    if (!user?.name) {
      return (
        <Navigate
          replace
          to="/start-adventure"
        />
      )
    }

    return (
      <Navigate
        replace
        to="/install-extension"
      />
    )
  }

  return children as JSX.Element
}

export default OnboardingBouncer
