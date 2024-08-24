import type { Item } from '~types'

import items from '~data/items'

const allItems = Object.values(items)

function sortItems(a: Item, b: Item) {
  return allItems.indexOf(a) - allItems.indexOf(b)
}

export default sortItems
