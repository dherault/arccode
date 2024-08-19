import { motion } from 'framer-motion'

import useCharacter from '~hooks/character/useCharacter'

import LevelUp from '~components/character/LevelUp'

function LevelUpContainer() {
  const { isLevelUpOpen } = useCharacter()

  return (
    <>
      <motion.div
        initial={{ display: 'none', opacity: 0 }}
        animate={isLevelUpOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 }}
        className="fixed inset-0 bg-white z-10"
      />
      <motion.div
        initial={{ display: 'none', opacity: 0 }}
        animate={isLevelUpOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 }}
        transition={isLevelUpOpen ? { delay: 0.3 } : {}}
        className="pt-32 md:pt-[72px] pb-8 fixed inset-0 bg-white z-20 overflow-y-auto"
      >
        <LevelUp />
      </motion.div>
    </>
  )
}

export default LevelUpContainer
