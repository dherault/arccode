import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import Logo from '~components/common/logos/Logo'
import { Button } from '~components/ui/Button'

function LandingNav() {
  return (
    <nav className="py-6 px-8 flex items-center gap-12">
      <div className="flex-1 flex items-center gap-4 text-blue">
        <Logo className="h-11 md:h-8 shrink-0" />
        <div className="text-sm leading-[1.1] md:text-xl font-semibold">
          Arccode
        </div>
      </div>
      <div className="hidden md:flex justify-center gap-12">
        <a
          href="#product"
          className="font-semibold text-sm"
        >
          Product
        </a>
        <a
          href="#pricing"
          className="font-semibold text-sm"
        >
          Pricing
        </a>
      </div>
      <div className="flex-1 flex justify-end">
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
