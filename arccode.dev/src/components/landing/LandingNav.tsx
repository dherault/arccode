import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import GithubButton from '~components/common/GithubButton'
import Logo from '~components/common/logos/Logo'
import { Button } from '~components/ui/Button'

function LandingNav() {
  return (
    <nav className="py-6 pl-8 pr-4 md:pr-8 flex items-center gap-4">
      <div className="flex-1 flex items-center gap-3 md:gap-4 text-blue">
        <Logo className="h-8 md:h-10 shrink-0" />
        <div className="text-xl md:text-xl font-semibold leading-[1.1]">
          Arccode
        </div>
      </div>
      <div className="flex-1 flex justify-end md:gap-2">
        <div className="mt-1.5">
          <GithubButton />
        </div>
        <Link to="/~">
          <Button variant="ghost">
            Log in
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default LandingNav
