import { useEffect, useState } from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')

      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)

      return true
    }
    catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)

      return false
    }
  }

  useEffect(() => {
    if (!copiedText) return

    const timeoutId = setTimeout(() => {
      setCopiedText(null)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [copiedText])

  return [copiedText, copy]
}

export default useCopyToClipboard
