import { Link } from 'react-router-dom'

import { Button } from '~components/ui/Button'

function NotFound() {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-white flex flex-col items-center justify-center text-center">
      ¯\_(ツ)_/¯
      <br />
      Page not found
      <Link
        to="/"
        className="mt-4 mb-3"
      >
        <Button>
          Go home
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
