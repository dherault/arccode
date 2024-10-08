import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react'
import { httpsCallable } from 'firebase/functions'

import type { KeywordRegistry } from '~types'

import { functions } from '~firebase'

import useDebounce from '~hooks/common/useDebounce'
import useUsers from '~hooks/administrator/useUsers'
import { useToast } from '~hooks/ui/useToast'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'
import { Button } from '~components/ui/Button'

import languages from '~data/languages'

type Props = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

const registerKeywordsAdministrator = httpsCallable(functions, 'registerKeywordsAdministrator')

function UserKeywordsDialog({ userId, setUserId }: Props) {
  const { users } = useUsers()
  const { toast } = useToast()

  const user = users.find(user => user.id === userId) ?? null
  const debouncedUser = useDebounce(user, 300)
  const finalUser = user ?? debouncedUser

  const [keywordRegistry, setKeywordRegistry] = useState<KeywordRegistry>({})
  const [loading, setLoading] = useState(false)

  const handleClose = useCallback(() => {
    setUserId('')
    setLoading(false)
    setKeywordRegistry({})
  }, [
    setUserId,
  ])

  const handleKeyword = useCallback((language: string, keyword: string, delta: number) => {
    setKeywordRegistry(x => {
      const nextKeywords = { ...x }

      if (!nextKeywords[language]) nextKeywords[language] = {}
      if (!nextKeywords[language][keyword]) nextKeywords[language][keyword] = 0

      nextKeywords[language][keyword] = Math.max(0, nextKeywords[language][keyword] + delta)

      return nextKeywords
    })
  }, [])

  const handleSubmit = useCallback(async () => {
    if (loading) return

    setLoading(true)

    if (!Object.keys(keywordRegistry).length) {
      handleClose()

      return
    }

    try {
      await registerKeywordsAdministrator({
        userId: finalUser?.id,
        keywordRegistry,
      })
    }
    catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error updating keywords',
        description: error.message,
      })
    }

    handleClose()
  }, [
    finalUser?.id,
    loading,
    keywordRegistry,
    handleClose,
    toast,
  ])

  useEffect(() => {
    setKeywordRegistry({})
  }, [
    finalUser,
  ])

  return (
    <Dialog
      open={!!user}
      onOpenChange={open => !open && handleClose()}
    >
      <DialogContent onOpenAutoFocus={event => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            Edit
            {' '}
            {finalUser?.character.name}
            's keywords
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm space-y-2">
          {Object.entries(languages).map(([languageKey, language]) => (
            <div key={languageKey}>
              <div className="font-semibold">
                {language.name}
              </div>
              {language.keywords.map(keyword => (
                <div
                  key={keyword}
                  className="flex gap-4"
                >
                  <div className="grow">
                    {keyword}
                  </div>
                  <div>
                    {(finalUser?.character.keywordRegistry[languageKey]?.[keyword] ?? 0) + (keywordRegistry[languageKey]?.[keyword] ?? 0)}
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="hover:underline cursor-pointer select-none"
                      onClick={() => handleKeyword(languageKey, keyword, 1)}
                    >
                      +1
                    </div>
                    <div
                      className="hover:underline cursor-pointer select-none"
                      onClick={() => handleKeyword(languageKey, keyword, 10)}
                    >
                      +10
                    </div>
                    <div
                      className="hover:underline cursor-pointer select-none"
                      onClick={() => handleKeyword(languageKey, keyword, 100)}
                    >
                      +100
                    </div>
                    <div
                      className="hover:underline cursor-pointer select-none"
                      onClick={() => handleKeyword(languageKey, keyword, -1)}
                    >
                      -1
                    </div>
                    <div
                      className="hover:underline cursor-pointer select-none"
                      onClick={() => handleKeyword(languageKey, keyword, -10)}
                    >
                      -10
                    </div>
                    <div
                      className="hover:underline cursor-pointer select-none"
                      onClick={() => handleKeyword(languageKey, keyword, -100)}
                    >
                      -100
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            loading={loading}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserKeywordsDialog
