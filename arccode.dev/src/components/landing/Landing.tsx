import AnimatedBackground from '~components/common/AnimatedBackground'
import LandingNav from '~components/landing/LandingNav'
import LandingHero from '~components/landing/LandingHero'
import LandingMaker from '~components/landing/LandingMaker'
import LandingProduct from '~components/landing/LandingProduct'
import LandingPickup from '~components/landing/LandingPickup'
import LandingFooter from '~components/landing/LandingFooter'

function Landing() {
  return (
    <AnimatedBackground>
      <LandingNav />
      <LandingHero />
      <LandingMaker />
      <LandingProduct />
      <LandingPickup />
      <div className="grow" />
      <LandingFooter />
    </AnimatedBackground>
  )
}

export default Landing
