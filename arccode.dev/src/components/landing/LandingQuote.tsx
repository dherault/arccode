import Balancer from 'react-wrap-balancer'

import Logo from '~components/common/logos/Logo'

function LandingQuote() {
  return (
    <section className="pt-16 md:pt-36 container flex flex-col items-center">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/images/landing/developer.png"
          alt="Maker"
          className="scale-x-[-1]"
        />
        <img
          src="images/landing/blur-purple.png"
          alt="Blur"
          className="absolute inset-0 opacity-85"
          style={{ filter: 'hue-rotate(333deg)' }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="-mt-4 px-16 text-white">
            <Logo className="h-12" />
            <div className="mt-6 text-xl font-semibold">
              <Balancer>
                "Coding is inherently fun — it's an act of creation that yields visible results. However, it can also become repetitive and laborious. That's why I created Arccode: to bring joy to your day and shield you from monotony. By incorporating variable rewards and a sense of progress into coding, I believe we can make the experience even more enjoyable. So, have fun coding!"
              </Balancer>
            </div>
            <div className="mt-6 font-semibold">
              David Hérault
            </div>
            <div className="mt-1 font-light">
              Maker of Arccode
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingQuote
