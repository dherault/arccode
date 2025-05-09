import useUser from '~hooks/user/useUser'
import useGuild from '~hooks/guild/useGuild'
import useGuilds from '~hooks/guild/useGuilds'

import Spinner from '~components/common/Spinner'
import { Button } from '~components/ui/Button'

function GuildsList() {
  const { user } = useUser()
  const { guilds, loadingGuilds, hasMoreGuilds, fetchMoreGuilds } = useGuilds()
  const { setGuildId } = useGuild()

  return (
    <div className="py-3 bg-white border rounded max-h-[512px] overflow-y-auto">
      {user?.isAdministrator && (
        <div className="px-4">
          <Button
            size="xs"
            variant="ghost"
            className="w-full"
          >
            Create your own guild!
          </Button>
        </div>
      )}
      {guilds.map(guild => (
        <div
          key={guild.id}
          className="py-1 px-4 flex items-center gap-2 hover:bg-neutral-50 cursor-pointer"
          onClick={() => setGuildId(guild.id)}
        >
          <div>
            {guild.emoji}
          </div>
          <div className="truncate">
            {guild.name}
          </div>
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
        <div className="py-1 flex items-center justify-center">
          <Spinner className="w-4" />
        </div>
      )}
    </div>
  )
}

export default GuildsList
