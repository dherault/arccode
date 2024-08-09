import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

function OnboardingExtension() {
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.hasConnectedExtension) return

    navigate('/~')
  }, [
    user,
    navigate,
  ])

  return (
    <>
      Waiting on extension
    </>
  )
}

export default OnboardingExtension
