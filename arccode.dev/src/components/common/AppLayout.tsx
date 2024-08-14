import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import GitHubButton from 'react-github-btn'

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
      <div className="absolute top-4 right-6 flex items-center gap-4 z-50">
        <div className="mt-1">
          <GitHubButton
            href="https://github.com/dherault/arccode"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star dherault/arccode on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <UserAvatarMenu />
      </div>
      <div className="mt-[72px] grow flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
