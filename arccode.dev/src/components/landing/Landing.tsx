import { Helmet } from 'react-helmet'

import AnimatedBackground from '~components/common/AnimatedBackground'
import LandingNav from '~components/landing/LandingNav'
import LandingHero from '~components/landing/LandingHero'
import LandingQuote from '~components/landing/LandingQuote'
import LandingProduct from '~components/landing/LandingProduct'
import LandingFaq from '~components/landing/LandingFaq'
import LandingPickup from '~components/landing/LandingPickup'
import LandingFooter from '~components/landing/LandingFooter'

function Landing() {
  return (
    <>
      <Helmet>
        <title>
          Arccode
        </title>
      </Helmet>
      <AnimatedBackground>
        <LandingNav />
        <LandingHero />
        <LandingProduct />
        <LandingQuote />
        <LandingFaq />
        <LandingPickup />
        <div className="grow" />
        <LandingFooter />
      </AnimatedBackground>
    </>
  )
}

export default Landing
