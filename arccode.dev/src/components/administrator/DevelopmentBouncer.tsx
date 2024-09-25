import type { PropsWithChildren } from 'react'

function DevelopmentBouncer({ children }: PropsWithChildren) {
  if (!import.meta.env.DEV) {
    return (
      <div>
        Available in development mode only.
      </div>
    )
  }

  return children as JSX.Element
}

export default DevelopmentBouncer
