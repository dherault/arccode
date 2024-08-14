import type { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'

import LevelUp from '~components/character/LevelUp'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function LevelUpContainer({ open, setOpen }: Props) {
  return (
    <>
      <motion.div
        initial={{ display: 'none', opacity: 0 }}
        animate={open ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 }}
        className="fixed inset-0 bg-white z-10"
      />
      <motion.div
        initial={{ display: 'none', opacity: 0 }}
        animate={open ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 }}
        transition={open ? { delay: 0.3 } : {}}
        className="pt-[72px] fixed inset-0 bg-white z-20"
      >
        <LevelUp onClose={() => setOpen(false)} />
      </motion.div>
    </>
  )
}

export default LevelUpContainer
