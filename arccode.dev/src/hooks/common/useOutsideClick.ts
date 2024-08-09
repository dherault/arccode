import { type RefObject, useEffect } from 'react'

function useOutsideClick(ref: RefObject<HTMLElement>, setOpen: (open: boolean) => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside, { capture: true })

    return () => {
      window.removeEventListener('mousedown', handleClickOutside, { capture: true })
    }
  }, [ref, setOpen])
}

export default useOutsideClick
