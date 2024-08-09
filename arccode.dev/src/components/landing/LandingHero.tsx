import { Link } from 'react-router-dom'
import Balancer from 'react-wrap-balancer'

import { Button } from '~components/ui/Button'

function LandingHero() {
  return (
    <section className="pt-8 pb-8 md:pt-24 md:pb-16 container flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        A RPG
        <div className="-my-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent leading-tight">
          for developers
        </div>
      </h1>
      <div className="mt-4 md:mt-8 md:text-lg text-neutral-700 text-center">
        <Balancer>
          Play now
        </Balancer>
      </div>
      <div className="mt-6 md:mt-10">
        <Link to="/~">
          <Button
            size="lg"
            className="flex md:hidden"
          >
            Get started
          </Button>
          <Button
            size="xl"
            className="hidden md:flex"
          >
            Get started
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default LandingHero
