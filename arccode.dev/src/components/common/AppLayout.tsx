import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Logotype from '~components/common/logos/Logotype'
import UserAvatarMenu from '~components/common/UserAvatarMenu'

function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative grow flex flex-col bg-neutral-background">
      <nav className="px-6 py-4 absolute top-0 left-0 right-0 flex items-center gap-4 z-50">
        <Link to="/~">
          <Logotype />
        </Link>
        <div className="grow" />
        <UserAvatarMenu />
      </nav>
      <div className="mt-18 grow flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
