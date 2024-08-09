import { type PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

import CenteredSpinner from '~components/common/CenteredSpinner'

function AuthenticationBouncer({ children }: PropsWithChildren) {
  const { viewer, loadingAuthentication } = useUser()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (viewer || loadingAuthentication) return

    navigate('/authentication', { replace: true })
  }, [
    viewer,
    loadingAuthentication,
    pathname,
    navigate,
  ])

  if (loadingAuthentication || !viewer) {
    return (
      <CenteredSpinner />
    )
  }

  return children as JSX.Element
}

export default AuthenticationBouncer
