function LandingMaker() {
  return (
    <section className="pt-16 md:pt-36 container flex flex-col items-center">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/images/landing/david.png"
          alt="Maker"
          className="scale-x-[-1]"
        />
        <img
          src="images/landing/blur-purple.png"
          alt="Blur"
          className="absolute inset-0 opacity-85"
          style={{ filter: 'hue-rotate(348deg)' }}
        />
        <div className="absolute inset-0 text-white">
          Foo
        </div>
      </div>
    </section>
  )
}

export default LandingMaker
