import useCharacter from '~hooks/character/useCharacter'

function LevelUpReward() {
  const { levelUpsUnlockedItems } = useCharacter()

  const levelUpsUnlockedItemsEntries = Object.entries(levelUpsUnlockedItems)

  if (!levelUpsUnlockedItemsEntries.length) {
    return null
  }

  return (
    <>
      LevelUpReward
    </>
  )
}

export default LevelUpReward
