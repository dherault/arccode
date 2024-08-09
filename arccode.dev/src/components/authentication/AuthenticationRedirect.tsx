import { type PropsWithChildren, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

import CenteredSpinner from '~components/common/CenteredSpinner'

function AuthenticationRedirect({ children }: PropsWithChildren) {
  const { user, viewer, loading } = useUser()
  const navigate = useNavigate()

  const handleRedirect = useCallback(async () => {
    if (!(user && viewer)) return

    navigate('/~', { replace: true })
  }, [
    user,
    viewer,
    navigate,
  ])

  useEffect(() => {
    handleRedirect()
  }, [handleRedirect])

  if (loading || user) {
    return (
      <CenteredSpinner />
    )
  }

  return children as JSX.Element
}

export default AuthenticationRedirect
