import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

function OnboardingBouncer({ children }: PropsWithChildren) {
  const { user } = useUser()

  if (!user?.onboarded) {
    return (
      <Navigate
        replace
        to="/start-adventure"
      />
    )
  }

  return children as JSX.Element
}

export default OnboardingBouncer
