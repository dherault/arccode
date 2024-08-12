import type { PropsWithChildren } from 'react'

import useUser from '~hooks/user/useUser'

import NotFound from '~components/common/NotFound'

function AdministratorBouncer({ children }: PropsWithChildren) {
  const { user } = useUser()

  if (!user?.isAdministrator) {
    return (
      <NotFound />
    )
  }

  return children as JSX.Element
}

export default AdministratorBouncer
