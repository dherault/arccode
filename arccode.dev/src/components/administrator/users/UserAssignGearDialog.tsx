import { type Dispatch, type SetStateAction, useCallback } from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { CHARACTER_SLOTS, CHARACTER_SLOT_LABELS, CHARACTER_SLOT_TYPES } from '~constants'

import { db } from '~firebase'

import useDebounce from '~hooks/common/useDebounce'
import useUsers from '~hooks/administrator/useUsers'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~components/ui/Select'

import items from '~data/items'

type Props = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

const NONE_VALUE = '(none)'

function UserAssignGearDialog({ userId, setUserId }: Props) {
  const { users } = useUsers()

  const user = users.find(user => user.id === userId) ?? null
  const debouncedUser = useDebounce(user, 300)
  const finalUser = user ?? debouncedUser

  const handleClose = useCallback(() => {
    setUserId('')
  }, [
    setUserId,
  ])

  const handleGear = useCallback((slot: string, itemId: string) => {
    if (!user) return

    updateDoc(doc(db, 'users', user.id), {
      [`character.${slot}`]: itemId,
      updatedAt: new Date().toISOString(),
    })
  }, [
    user,
  ])

  return (
    <Dialog
      open={!!user}
      onOpenChange={open => !open && handleClose()}
    >
      <DialogContent onOpenAutoFocus={event => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            Assign
            {' '}
            {finalUser?.character.name}
            's gear
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {CHARACTER_SLOTS.map(slot => {
            const slotItems = Object.values(items)
              .filter(item => item.type === CHARACTER_SLOT_TYPES[slot])
              .filter(item => (finalUser?.character.unlockedItems[item.id] ?? 0) > 0)

            return (
              <div
                key={slot}
                className="flex items-center gap-2"
              >
                <div className="grow text-sm">
                  {CHARACTER_SLOT_LABELS[slot]}
                  {' '}
                  (
                  {slotItems.length}
                  )
                </div>
                <Select
                  value={finalUser?.character[slot]}
                  onValueChange={value => handleGear(slot, value === NONE_VALUE ? '' : value)}
                >
                  <SelectTrigger className="w-[256px]">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE_VALUE}>
                      Unassigned
                    </SelectItem>
                    {slotItems.map(item => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserAssignGearDialog
