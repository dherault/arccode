import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook'

import { logAnalytics } from '~firebase'

import useUser from '~hooks/user/useUser'

import ConnectExtension from '~components/extension/ConnectExtension'

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

    logAnalytics('connected_extension')

    navigate('/~')
  }, [
    user,
    navigate,
  ])

  return (
    <ConnectExtension subtitle="Connect the extension to continue" />
  )
}

export default OnboardingExtension
