import type { Item } from '~types'

import avatars from '~data/avatars'
import gears from '~data/gears'

const items: Record<string, Item> = {
  ...avatars,
  ...gears,
}

export default items
