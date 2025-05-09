import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

function AdministratorLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="mb-4 container flex items-center gap-2">
        <Link
          to="/administrator/users"
          className="text-blue hover:underline"
        >
          Users
        </Link>
        {import.meta.env.DEV && (
          <>
            {' - '}
            <Link
              to="/administrator/emails"
              className="text-blue hover:underline"
            >
              Emails
            </Link>
            {' - '}
            <Link
              to="/administrator/guilds"
              className="text-blue hover:underline"
            >
              Guilds
            </Link>
          </>
        )}
      </div>
      {children}
    </>
  )
}

export default AdministratorLayout
