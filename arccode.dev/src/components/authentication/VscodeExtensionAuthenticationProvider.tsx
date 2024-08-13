import { type PropsWithChildren, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

function VscodeExtensionAuthenticationProvider({ children }: PropsWithChildren) {
  const { viewer, user } = useUser()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleRedirect = useCallback(async () => {
    if (!(user && viewer)) return

    const uri = searchParams.get('redirect_uri')

    if (!uri || !uri.startsWith('vscode://')) return

    const state = searchParams.get('state') ?? ''

    if (!state) return

    setSearchParams(sp => {
      sp.delete('redirect_uri')
      sp.delete('state')

      return sp
    })

    const accessToken = await viewer.getIdToken()

    window.location.assign(
      `${uri}?state=${state}&user_id=${user.id}&user_name=${encodeURIComponent(user.name || user.email)}&refresh_token=${viewer.refreshToken}&access_token=${accessToken}`
    )

    navigate('/onboarding/install-extension', { replace: true })
  }, [
    user,
    viewer,
    searchParams,
    setSearchParams,
    navigate,
  ])

  useEffect(() => {
    handleRedirect()
  }, [handleRedirect])

  return children as JSX.Element
}

export default VscodeExtensionAuthenticationProvider
