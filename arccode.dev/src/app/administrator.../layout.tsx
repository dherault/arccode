import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import AdministratorBouncer from '~components/administrator/AdministratorBouncer'
import AppLayout from '~components/common/AppLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <AdministratorBouncer>
        <AppLayout>
          {children}
        </AppLayout>
      </AdministratorBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
