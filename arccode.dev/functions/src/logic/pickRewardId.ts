import type { ItemRarity, ItemType } from '~types'

import { RARITY_PROBABILITIES, WIN_PROBABILITIES } from '~constants'

import items from '~data/items'

const allItems = Object.values(items)
const gearTypes: ItemType[] = [
  'helm',
  'amulet',
  'armor',
  'ring',
  'main-hand',
  'off-hand',
  'gloves',
  'boots',
  'spell',
]
const gears = allItems.filter(item => gearTypes.includes(item.type))
const avatars = allItems.filter(item => item.type === 'avatar')
const allRewards = {
  gears,
  avatars,
}

function pickRewardId() {
  const typeChance = Math.random()
  const pickedType = Object.entries(WIN_PROBABILITIES).find(([, value]) => typeChance >= value[0] && typeChance < value[1])?.[0] ?? 'gear'
  const itemChance = Math.random()
  const rarity = (Object.entries(RARITY_PROBABILITIES).find(([, value]) => itemChance >= value[0] && itemChance < value[1])?.[0] ?? 'common') as ItemRarity
  const rewards = (allRewards[pickedType as keyof typeof allRewards] ?? allRewards.gears).filter(item => item.rarity === rarity)

  return rewards[Math.floor(Math.random() * rewards.length)].id
}

export default pickRewardId
