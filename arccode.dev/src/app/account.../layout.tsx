import type { PropsWithChildren } from 'react'

import AppLayout from '~components/common/AppLayout'
import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <AppLayout>
        {children}
      </AppLayout>
    </AuthenticationBouncer>
  )
}

export default Layout
