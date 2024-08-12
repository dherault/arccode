import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import AdministratorBouncer from '~components/administrator/AdministratorBouncer'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <AdministratorBouncer>
        {children}
      </AdministratorBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
