import { useCallback, useState } from 'react'
import { Copy, Share2 } from 'lucide-react'

import useCharacter from '~hooks/character/useCharacter'

import { Button } from '~components/ui/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '~components/ui/Dialog'

let copyTimeoutId: NodeJS.Timeout | null = null

function ShareButton() {
  const { characterId, isEditable } = useCharacter()

  const link = `https://arccode.dev/~/${characterId}`

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(link)

    setCopied(true)

    if (copyTimeoutId) clearTimeout(copyTimeoutId)

    copyTimeoutId = setTimeout(() => {
      setCopied(false)
    }, 2000)
  }, [link])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Share link
        </DialogHeader>
        <div>
          <div>
            Share this link with others to let them view
            {' '}
            {isEditable ? 'your' : 'this'}
            {' '}
            character.
          </div>
          <div className="mt-2 py-1 px-3 bg-neutral-50 border rounded flex items-center justify-between text-xs">
            <div>
              {link}
            </div>
            <Button
              variant="ghost"
              size={copied ? 'xs' : 'icon-sm'}
              onClick={handleCopy}
            >
              {copied ? (
                <div className="-mx-1 font-light text-green-500">
                  Copied!
                </div>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default ShareButton
