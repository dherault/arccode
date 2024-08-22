import useGuilds from '~hooks/guild/useGuilds'

function GuildsList() {
  const { guilds } = useGuilds()

  return (
    <div className="p-4 bg-white border rounded">
      {guilds.map(guild => (
        <div key={guild.id}>
          {guild.name}
        </div>
      ))}
    </div>
  )
}

export default GuildsList
