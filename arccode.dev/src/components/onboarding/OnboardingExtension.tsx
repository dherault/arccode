import { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook'
import Balancer from 'react-wrap-balancer'

import { logAnalytics } from '~firebase'

import useUser from '~hooks/user/useUser'

import getPlatform from '~utils/common/getPlatform'

import ThreeDots from '~components/common/ThreeDots'

function OnboardingExtension() {
  const { user, updateUser } = useUser()
  const navigate = useNavigate()
  const platform = getPlatform()
  const cmd = platform === 'macos' ? 'Cmd' : 'Ctrl'

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
    <div className="py-12 container grow flex flex-col items-center bg-neutral-background">
      <h1 className="text-4xl font-bold">
        Arccode works with VSCode
      </h1>
      <div className="mt-2 text-lg text-neutral-700">
        Connect the extension to continue
      </div>
      <div className="mt-12 text-xl font-semibold text-blue">
        1. Install the extension
      </div>
      <img
        src="/images/onboarding/arccode-extension-marketplace.png"
        className="mt-3 w-[512px]"
      />
      <div className="mt-3 text-sm text-neutral-700">
        <Balancer>
          Look for "Arccode" in the VSCode marketplace and install the extension.
        </Balancer>
      </div>
      <div className="mt-12 text-xl font-semibold text-blue">
        2. Run the sign in command
      </div>
      <img
        src="/images/onboarding/arccode-extension-sign-in.png"
        className="mt-3 w-[512px]"
      />
      <div className="mt-3 text-sm text-neutral-700">
        <Balancer>
          Press
          {' '}
          <code className="py-0.5 px-1 bg-neutral-100 rounded-full border font-mono">
            {cmd}
            +Shift+P
          </code>
          {' '}
          to open the command palette and run the
          {' '}
          <code className="py-0.5 px-1 bg-neutral-100 rounded-full border font-mono">Arccode: Sign in</code>
          {' '}
          command.
        </Balancer>
      </div>
      <div className="mt-12 text-neutral-700">
        Status: Waiting on extension connection
        <ThreeDots />
      </div>
      <div className="text-neutral-700">
        Issue? Contact
        {' '}
        <Link
          to="/support"
          className="underline"
        >
          support
        </Link>
        .
      </div>
    </div>
  )
}

export default OnboardingExtension
