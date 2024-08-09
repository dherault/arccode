import { Link } from 'react-router-dom'
import Balancer from 'react-wrap-balancer'

import { Button } from '~components/ui/Button'

function ExtensionSuccess() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div className="p-8 border shadow rounded-lg text-center max-w-[512px]">
        <h1 className="text-2xl font-bold">
          <Balancer>
            You've successfully installed the extension
          </Balancer>
        </h1>
        <div className="mt-4">
          <Balancer>
            Return to your IDE and start coding! Type some keywords of your choice and see the magic happen.
          </Balancer>
        </div>
        <Link
          to="/"
          className="mt-4 block"
        >
          <Button>
            Continue
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ExtensionSuccess
