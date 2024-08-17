import { Link } from 'react-router-dom'
import Balancer from 'react-wrap-balancer'

import { Button } from '~components/ui/Button'

function LandingHero() {
  return (
    <section className="pt-8 pb-8 md:pt-24 md:pb-16 container flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        Put some
        {' '}
        <span className="-my-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent leading-tight">
          fun
        </span>
        <br />
        in your code
      </h1>
      <div className="mt-4 md:mt-8 md:text-lg text-neutral-700 text-center">
        <Balancer>
          Arccode is a RPG for developers
        </Balancer>
      </div>
      <div className="mt-2">
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
      <div className="mt-16 p-4 bg-neutral-100 border rounded-xl">
        <img
          src="/images/landing/hero.png"
          alt="App screenshot"
          className="border rounded-lg"
        />
      </div>
    </section>
  )
}

export default LandingHero
