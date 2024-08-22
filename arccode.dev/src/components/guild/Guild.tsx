import useGuild from '~hooks/guild/useGuild'

function Guild() {
  const { guild } = useGuild()

  if (!guild) {
    return (
      <div className="text-sm text-neutral-500">
        Start by selecting a guild
      </div>
    )
  }

  return (
    <div className="p-4 bg-white border rounded">
      {guild.name}
    </div>
  )
}

export default Guild
