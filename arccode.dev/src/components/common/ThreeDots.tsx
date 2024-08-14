import { useEffect, useState } from 'react'

function ThreeDots() {
  const [nDots, setNDots] = useState(3)

  let dots = ''

  for (let i = 0; i < nDots; i++) {
    dots += '.'
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNDots(x => (x + 1) % 4)
    }, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <span className="inline-block min-w-4">
      {dots}
    </span>
  )
}

export default ThreeDots
