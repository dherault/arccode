import { useState } from 'react'

import LevelUpContainer from '~components/character/LevelUpContainer'

function LevelUpCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="p-4 flex items-center justify-center bg-white border border-blue rounded text-blue cursor-pointer"
      >
        <div className="mt-1 animate-bounce">
          Level up!
        </div>
      </div>
      <LevelUpContainer
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default LevelUpCard
