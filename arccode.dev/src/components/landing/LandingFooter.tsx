import { Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

import InstagramLogo from '~components/common/logos/InstagramLogo'
import Logo from '~components/common/logos/Logo'

function LandingFooter() {
  return (
    <footer className="pt-16 pb-32 md:pt-32 md:px-8 flex flex-col items-center md:grid grid-cols-[2fr,3fr] md:items-start">
      <div className="flex items-center gap-4 text-blue ">
        <Logo className="h-11 md:h-8 shrink-0" />
        <div className="leading-[1.1] text-xl font-semibold max-w-[72px] md:max-w-max">
          Arccode
        </div>
      </div>
      <div className="md:mt-1.5 md:grid grid-cols-4 gap-12 text-center md:text-left">
        {/* <div className="mt-6 md:mt-0 flex flex-col gap-2 md:gap-4">
          <div className="md:mb-2 text-sm font-semibold">
            Navigation
          </div>
          <a
            href="#game"
            className="text-sm text-neutral-700"
          >
            Game
          </a>
        </div> */}
        <div className="mt-6 md:mt-0 flex flex-col gap-2 md:gap-4">
          <div className="md:mb-2 text-sm font-semibold">
            Company
          </div>
          <Link
            to="/support"
            className="text-sm text-neutral-700"
          >
            Support
          </Link>
          <Link
            to="/legal"
            className="text-sm text-neutral-700"
          >
            Terms and Conditions
          </Link>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col gap-2 md:gap-4">
          <div className="md:mb-2 text-sm font-semibold">
            Social
          </div>
          <a
            href="#"
            className="text-sm text-neutral-700 flex items-center justify-center md:justify-start gap-2"
          >
            <Linkedin className="mb-0.5 h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="#"
            className="text-sm text-neutral-700 flex items-center justify-center md:justify-start gap-2"
          >
            <InstagramLogo className="w-4" />
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
