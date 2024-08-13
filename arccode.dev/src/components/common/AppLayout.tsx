import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Logotype from '~components/common/logos/Logotype'
import UserAvatarMenu from '~components/common/UserAvatarMenu'

function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative grow flex flex-col bg-neutral-background">
      <div className="absolute top-4 left-6 z-50">
        <Link to="/~">
          <Logotype />
        </Link>
      </div>
      <div className="absolute top-4 right-6 z-50">
        <UserAvatarMenu />
      </div>
      <div className="mt-[72px] grow flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
