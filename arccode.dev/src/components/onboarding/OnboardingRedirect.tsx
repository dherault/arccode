import { Navigate } from 'react-router-dom'

function OnboardingRedirect() {
  return (
    <Navigate
      replace
      to="/onboarding/start-adventure"
    />
  )
}

export default OnboardingRedirect
