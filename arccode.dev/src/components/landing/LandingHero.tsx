import { Link } from 'react-router-dom'
import Balancer from 'react-wrap-balancer'

import { Button } from '~components/ui/Button'

function LandingHero() {
  return (
    <section className="pt-12 md:pt-24 px-2 md:container flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
        The first
        <div className="-my-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent leading-tight">
          role-playing game
        </div>
        for developers
      </h1>
      <div className="mt-4 md:mt-6 md:text-lg font-light text-center max-w-xl">
        <Balancer>
          XP, level ups and guilds. All while you work.
        </Balancer>
      </div>
      <div className="mt-8">
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
      <div className="mt-12 md:mt-36 md:p-4 bg-neutral-100 md:border rounded-xl">
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
