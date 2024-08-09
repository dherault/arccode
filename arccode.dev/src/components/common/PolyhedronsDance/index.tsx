import { useEffect, useRef } from 'react'

// @ts-expect-error
import handleCanvas from './handleCanvas'

function PolyhedronsDance() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => handleCanvas(canvasRef.current), [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
    />
  )
}

export default PolyhedronsDance
