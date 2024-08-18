import { Blocks, CodeXml, VenetianMask } from 'lucide-react'
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
          Code is xp
        </Balancer>
      </h2>
      <div className="mt-4 md:text-lg text-neutral-700 text-center max-w-4xl">
        <Balancer>
          Xp is levels, levels are loot. And so on.
        </Balancer>
      </div>
      <div className="mt-8 md:mt-16 grid md:grid-cols-2 gap-y-8 md:gap-y-24 md:gap-x-12 w-full md:w-auto">
        <div className="max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden">
          <img
            src="/images/landing/characters.png"
            alt="Characters"
            className="w-full"
            style={{
              filter: 'invert(96%) sepia(6%) saturate(96%) hue-rotate(202deg) brightness(89%) contrast(93%)',
            }}
          />
        </div>
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <VenetianMask className="w-6 h-6 text-white" />
          </div>
          <div className="mt-4 font-semibold">
            Create a character
          </div>
          <div className="mt-1 md:mt-3 text-neutral-700 md:leading-relaxed max-w-lg">
            <Balancer>
              Click play, pick a pseudo and start a new adventure.
            </Balancer>
          </div>
        </div>
        <div className="block md:hidden max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden">
          <img
            src="/images/landing/vscode-plus-arccode.png"
            alt="Vscode plus Arccode"
            className="w-full"
          />
        </div>
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <Blocks className="w-6 h-6 text-white" />
          </div>
          <div className="mt-4 font-semibold">
            Install the VSCode extension
          </div>
          <div className="mt-1 md:mt-3 text-neutral-700 md:leading-relaxed max-w-lg">
            <Balancer>
              Connect VSCode to Arccode and resume your coding session. The extension reads your code and counts your keywords such a
              {' '}
              <code className="py-0.5 px-1 bg-neutral-100 rounded-full border font-mono text-sm text-neutral-700">
                function
              </code>
              {' '}
              or
              {' '}
              <code className="py-0.5 px-1 bg-neutral-100 rounded-full border font-mono text-sm text-neutral-700">
                true
              </code>
              .
            </Balancer>
            <div className="py-2 px-3 mt-2 w-fit border bg-neutral-50 rounded text-neutral-500 text-xs">
              <Balancer>
                Arccode never uploads your code to a remote server.
                Everything is processed locally and only metadata is sent to the database.
                You can learn more by
                {' '}
                <a
                  href="https://github.com/dherault/arccode"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue hover:underline"
                >
                  reading the code on GitHub
                </a>
              </Balancer>
            </div>
          </div>
        </div>
        <div className="hidden md:block max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden">
          <img
            src="/images/landing/vscode-plus-arccode.png"
            alt="Vscode plus Arccode"
            className="w-full"
          />
        </div>
        <div className="max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden" />
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <CodeXml className="w-6 h-6 text-white" />
          </div>
          <div className="mt-4 font-semibold">
            Start coding and earns xp
          </div>
          <div className="mt-1 md:mt-3 text-neutral-700 md:leading-relaxed max-w-lg">
            <Balancer>
              Turn the keywords your type into experience points and eventually level ups! Earn legendary gear to equip your character and join a guild to share your progress with others.
            </Balancer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingProduct
