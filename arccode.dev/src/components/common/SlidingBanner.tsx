import { Fragment, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import useRefresh from '~hooks/common/useRefresh'

type Props = {
  gap?: number
  duration?: number
  children: ReactNode[]
}

function SlidingBanner({ gap = 16, duration = 10, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const motionRef = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState(0)

  useRefresh()

  const handleResize = useCallback(() => {
    if (!motionRef.current) return

    let sum = 0
    const nodes = motionRef.current.children

    for (let i = 0; i < nodes.length; i++) {
      sum += (nodes[i] as HTMLElement).offsetWidth + gap
    }

    setDimension(sum / 2)
  }, [
    gap,
  ])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [
    handleResize,
  ])

  const rootWidth = rootRef.current?.clientWidth ?? 'auto'

  return (
    <div
      ref={rootRef}
      className="overflow-hidden w-full"
    >
      <motion.div
        ref={motionRef}
        animate={{
          x: ['0%', -(rootWidth === 'auto' ? dimension : Math.max(rootWidth + gap, dimension))],
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration / 4,
            ease: 'linear',
          },
        }}
        className="flex w-fit"
        style={{ gap }}
      >
        <div
          className="flex items-center justify-center w-max border border-green-500"
          style={{
            gap,
            minWidth: rootWidth,
          }}
        >
          {children.map((child, index) => (
            <Fragment key={index}>
              {child}
            </Fragment>
          ))}
        </div>
        <div
          className="flex items-center justify-center w-max border border-red-500"
          style={{
            gap,
            minWidth: rootWidth,
          }}
        >
          {children.map((child, index) => (
            <Fragment key={index}>
              {child}
            </Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SlidingBanner
