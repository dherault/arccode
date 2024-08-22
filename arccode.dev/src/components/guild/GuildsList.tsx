import useGuild from '~hooks/guild/useGuild'
import useGuilds from '~hooks/guild/useGuilds'

import Spinner from '~components/common/Spinner'
import { Button } from '~components/ui/Button'

function GuildsList() {
  const { guilds, loadingGuilds, hasMoreGuilds, fetchMoreGuilds } = useGuilds()
  const { setGuildId } = useGuild()

  return (
    <div className="py-2.5 bg-white border rounded max-h-[512px] overflow-y-auto">
      <div className="px-4">
        <Button
          size="xs"
          variant="ghost"
          className="w-full"
        >
          Create your own guild!
        </Button>
      </div>
      {guilds.map(guild => (
        <div
          key={guild.id}
          className="py-0.5 px-4 flex items-center gap-2 hover:bg-neutral-50 cursor-pointer"
          onClick={() => setGuildId(guild.id)}
        >
          <div>
            {guild.emoji}
          </div>
          {guild.name}
        </div>
      ))}
      {!loadingGuilds && hasMoreGuilds && (
        <div className="px-4">
          <Button
            size="xs"
            variant="ghost"
            className="w-full"
            onClick={fetchMoreGuilds}
          >
            Load more
          </Button>
        </div>
      )}
      {loadingGuilds && (
        <div className="py-1.5 flex items-center justify-center">
          <Spinner className="w-4" />
        </div>
      )}
    </div>
  )
}

export default GuildsList
