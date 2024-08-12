import { type Dispatch, type SetStateAction, useCallback } from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { CHARACTER_SLOTS, CHARACTER_SLOT_LABELS } from '~constants'

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

type Props = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

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
            Assign
            {' '}
            {finalUser?.character.name}
            's gear
          </DialogTitle>
        </DialogHeader>
        <div>
          {CHARACTER_SLOTS.map(slot => (
            <div
              key={slot}
              className="grid grid-cols-2"
            >
              <div>
                {CHARACTER_SLOT_LABELS[slot]}
              </div>
              <Select
                value={finalUser?.character[slot]}
                onValueChange={value => handleGear(slot, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserAssignGearDialog
