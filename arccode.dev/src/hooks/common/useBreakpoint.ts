import { useCallback, useEffect, useMemo, useState } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': Infinity,
}

function useBreakpoint(breakpoints = DEFAULT_BREAKPOINTS): Breakpoint {
  const breakpointEntries = useMemo(() => (
    Object
      .entries(breakpoints)
      .sort((a, b) => a[1] - b[1])
      .map(([key, value]) => ({ key, value }))
  ), [
    breakpoints,
  ])

  const searchBreakpoint = useCallback(() => (
    breakpointEntries.find(x => window.innerWidth < x.value)?.key as Breakpoint
  ), [
    breakpointEntries,
  ])

  const [breakpoint, setBreakpoint] = useState(searchBreakpoint())

  useEffect(() => {
    function handleResize() {
      setBreakpoint(searchBreakpoint())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [
    searchBreakpoint,
  ])

  return breakpoint
}

export default useBreakpoint
