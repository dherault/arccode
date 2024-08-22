import GuildsProvider from '~components/guild/GuildsProvider'
import GuildsList from '~components/guild/GuildsList'

function Guilds() {
  return (
    <GuildsProvider>
      <div className="text-3xl font-bold font-display">
        Guilds
      </div>
      <div className="mt-2 flex items-start gap-16">
        <div className="max-w-[448px] lg:w-auto lg:min-w-[448px]">
          <GuildsList />
        </div>
        <div className="grow">
          Guild
        </div>
      </div>
    </GuildsProvider>
  )
}

export default Guilds
