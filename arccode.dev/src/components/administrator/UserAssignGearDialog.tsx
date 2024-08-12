import { type Dispatch, type SetStateAction, useCallback } from 'react'

import type { User } from '~types'

import useDebounce from '~hooks/common/useDebounce'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'
import { Button } from '~components/ui/Button'

type Props = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

function UserAssignGearDialog({ user, setUser }: Props) {
  const debouncedUser = useDebounce(user)
  const finalUser = user ?? debouncedUser

  const handleClose = useCallback(() => {
    setUser(null)
  }, [
    setUser,
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
          Assign gears
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            form="gear-form"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserAssignGearDialog
