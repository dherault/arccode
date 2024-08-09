import { type PropsWithChildren } from 'react'

import PolyhedronsDance from '~components/common/PolyhedronsDance'

function AnimatedBackground({ children }: PropsWithChildren) {
  return (
    <>
      <div className="absolute inset-0 -z-10">
        <PolyhedronsDance />
      </div>
      {children}
    </>
  )
}

export default AnimatedBackground
