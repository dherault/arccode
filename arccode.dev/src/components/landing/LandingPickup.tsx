import { Link } from 'react-router-dom'
import Balancer from 'react-wrap-balancer'

import { Button } from '~components/ui/Button'

function LandingPickup() {
  return (
    <section className="pt-16 pb-8 md:pb-16 container flex flex-col items-center">
      <div className="text-4xl font-bold text-center">
        <Balancer>
          Adventure awaits
        </Balancer>
      </div>
      <div className="mt-4 font-light text-lg text-neutral-700 text-center max-w-4xl">
        <Balancer>
          Play now
        </Balancer>
      </div>
      <div className="mt-6">
        <Link to="/~">
          <Button
            size="lg"
            className="flex md:hidden"
          >
            Start game
          </Button>
          <Button
            size="xl"
            className="hidden md:flex"
          >
            Start game
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default LandingPickup
