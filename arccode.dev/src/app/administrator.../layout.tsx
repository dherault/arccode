import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import AdministratorBouncer from '~components/administrator/AdministratorBouncer'
import AppLayout from '~components/common/AppLayout'
import AdministratorLayout from '~components/administrator/AdministratorLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <AdministratorBouncer>
        <AppLayout>
          <AdministratorLayout>
            {children}
          </AdministratorLayout>
        </AppLayout>
      </AdministratorBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
