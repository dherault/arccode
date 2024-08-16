import { Link } from 'react-router-dom'

import { Button } from '~components/ui/Button'

type Props = {
  source: string
  message?: string
}

function ErrorOccured({ source, message }: Props) {
  return (
    <div className="p-4 fixed inset-0 bg-white flex flex-col items-center justify-center text-center z-50">
      ¯\_(ツ)_/¯
      <br />
      An error occured
      <div className="mt-1 px-1 py-0.5 bg-neutral-50 border rounded-full text-xs text-neutral-400">
        {source}
        {' - '}
        {message ?? 'Unknown'}
      </div>
      <Link
        to="/"
        className="mt-6"
      >
        <Button>
          Go home
        </Button>
      </Link>
      <Link
        to="/support"
        className="mt-2 text-blue hover:underline text-xs"
      >
        Contact support
      </Link>
    </div>
  )
}

export default ErrorOccured
