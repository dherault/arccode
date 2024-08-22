import useGuild from '~hooks/guild/useGuild'
import useGuilds from '~hooks/guild/useGuilds'

function GuildsList() {
  const { guilds } = useGuilds()
  const { setGuildId } = useGuild()

  return (
    <div className="py-2.5 bg-white border rounded">
      {guilds.map(guild => (
        <div
          key={guild.id}
          className="py-0.5 px-4 flex items-center gap-2 hover:bg-neutral-50 cursor-pointer"
          onClick={() => setGuildId(guild.id)}
        >
          <span>
            {guild.emoji}
          </span>
          {guild.name}
        </div>
      ))}
    </div>
  )
}

export default GuildsList
