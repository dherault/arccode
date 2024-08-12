import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook'

import useUser from '~hooks/user/useUser'

function OnboardingExtension() {
  const { user, updateUser } = useUser()
  const navigate = useNavigate()

  const handleComplete = useCallback(() => {
    updateUser({
      hasConnectedExtension: true,
    })
  }, [
    updateUser,
  ])

  useHotkeys('mod+e', handleComplete, [handleComplete])

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
