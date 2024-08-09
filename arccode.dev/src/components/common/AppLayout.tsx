import type { PropsWithChildren } from 'react'

import Logotype from '~components/common/logos/Logotype'
import UserAvatarMenu from '~components/common/UserAvatarMenu'

function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="grow flex flex-col bg-neutral-background">
      <nav className="px-4 py-4 flex items-center gap-4">
        <Logotype />
        <div className="grow" />
        <UserAvatarMenu />
      </nav>
      <div className="grow flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
