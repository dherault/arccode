import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  gap?: number
  duration?: number
  children: ReactNode[]
}

function SlidingBanner({ gap = 16, duration = 10, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState(0)

  const extenedChildren = [...children, ...children]

  const handleResize = useCallback(() => {
    if (!rootRef.current) return

    let sum = 0
    const nodes = rootRef.current.children

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

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        ref={rootRef}
        animate={{
          x: ['0%', -dimension],
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
        className="flex"
        style={{ gap }}
      >
        {extenedChildren.map((child, index) => (
          <div
            key={index}
            className="flex items-center min-w-full"
            style={{ gap }}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default SlidingBanner
