import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { doc, updateDoc } from 'firebase/firestore'

import type { User } from '~types'

import { db } from '~firebase'

import useDebounce from '~hooks/common/useDebounce'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'

import items from '~data/items'

type Props = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

function UserAssignGearDialog({ user, setUser }: Props) {
  const debouncedUser = useDebounce(user)
  const finalUser = user ?? debouncedUser

  const [unlockedItems, setUnlockItems] = useState<Record<string, number>>({})

  const handleClose = useCallback(() => {
    setUser(null)
    setUnlockItems({})
  }, [
    setUser,
  ])

  const handleGear = useCallback((itemId: string, delta = 1) => {
    if (!user) return

    const nextValue = Math.max(0, (user.character.unlockedItems[itemId] ?? 0) + delta)

    setUnlockItems(x => ({ ...x, [itemId]: nextValue }))
    updateDoc(doc(db, 'users', user.id), {
      [`character.unlockedItems.${itemId}`]: nextValue,
    })
  }, [
    user,
  ])

  return (
    <Dialog
      open={!!user}
      onOpenChange={open => !open && handleClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit
            {' '}
            {finalUser?.character.name}
            {' '}
            gear
          </DialogTitle>
        </DialogHeader>
        <div>
          {Object.values(items).map(item => (
            <div
              key={item.id}
              className="grid grid-cols-[2fr_6fr_1fr_1fr] gap-2 text-sm"
            >
              <div className="text-xs text-neutral-700">
                {item.type}
              </div>
              <div>
                {item.name}
              </div>
              <div>
                {unlockedItems[item.id] ?? finalUser?.character.unlockedItems[item.id] ?? 0}
              </div>
              <div className="flex gap-2">
                <Plus
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleGear(item.id)}
                />
                <Minus
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleGear(item.id, -1)}
                />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserAssignGearDialog
