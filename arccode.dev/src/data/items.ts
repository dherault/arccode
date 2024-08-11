import type { Item } from '~types'

import avatars from '~data/avatars'

const items: Record<string, Item> = {
  ...avatars,
}

export default items
