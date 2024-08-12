import type { Item } from '~types'

import avatars from '~data/avatars'
import gears from '~data/gears'
import spells from '~data/spells'

const items: Record<string, Item> = {
  ...avatars,
  ...gears,
  ...spells,
}

export default items
