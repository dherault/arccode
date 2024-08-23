import GuildsProvider from '~components/guild/GuildsProvider'
import GuildProvider from '~components/guild/GuildProvider'
import GuildsList from '~components/guild/GuildsList'
import Guild from '~components/guild/Guild'

function Guilds() {
  return (
    <GuildsProvider>
      <GuildProvider>
        <div className="text-3xl font-bold font-display">
          Guilds
        </div>
        <div className="mt-4 flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="lg:w-[320px]">
            <GuildsList />
          </div>
          <div className="grow">
            <Guild />
          </div>
        </div>
      </GuildProvider>
    </GuildsProvider>
  )
}

export default Guilds
