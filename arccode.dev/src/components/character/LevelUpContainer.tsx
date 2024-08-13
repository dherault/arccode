import type { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'

import { Button } from '~components/ui/Button'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function LevelUpContainer({ open, setOpen }: Props) {
  return (
    <>
      <motion.div
        animate={open ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 }}
        className="fixed inset-0 bg-white z-10"
      />
      <motion.div
        animate={open ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 }}
        transition={open ? { delay: 0.3 } : {}}
        className="pt-[72px] fixed inset-0 flex-col items-center bg-white z-20"
      >
        <Button onClick={() => setOpen(false)}>
          Close
        </Button>
      </motion.div>
    </>
  )
}

export default LevelUpContainer
