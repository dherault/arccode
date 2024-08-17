import { Component, Replace, Shapes } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

function LandingProduct() {
  return (
    <section className="pt-16 md:pt-36 container flex flex-col items-center">
      <div
        id="product"
        className="text-blue font-semibold text-center"
      >
        How it works
      </div>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-center">
        <Balancer>
          Create a character
        </Balancer>
      </h2>
      <div className="mt-4 md:text-lg text-neutral-700 text-center max-w-4xl">
        <Balancer>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Balancer>
      </div>
      <div className="mt-8 md:mt-16 grid md:grid-cols-2 gap-y-8 md:gap-y-24 md:gap-x-12">
        <div className="aspect-[1.618/1] border rounded-lg bg-white" />
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <Shapes className="w-6 h-6 text-white" />
          </div>
          <div className="mt-3 font-semibold">
            Install the VSCode extension
          </div>
          <div className="mt-3 text-neutral-700 leading-relaxed max-w-xl">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </div>
        </div>
        <div className="block md:hidden aspect-[1.618/1] border rounded-lg bg-white" />
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <Replace className="w-6 h-6 text-white" />
          </div>
          <div className="mt-3 font-semibold">
            Start coding
          </div>
          <div className="mt-3 text-neutral-700 leading-relaxed max-w-xl">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </div>
        </div>
        <div className="hidden md:block aspect-[1.618/1] border rounded-lg bg-white" />
        <div className="aspect-[1.618/1] border rounded-lg bg-white" />
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <Component className="w-6 h-6 text-white" />
          </div>
          <div className="mt-3 font-semibold">
            Earns xp
          </div>
          <div className="mt-3 text-neutral-700 leading-relaxed max-w-xl">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingProduct
