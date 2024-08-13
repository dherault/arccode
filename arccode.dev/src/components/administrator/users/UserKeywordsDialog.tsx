import { type Dispatch, type SetStateAction, useCallback } from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '~firebase'

import useDebounce from '~hooks/common/useDebounce'
import useUsers from '~hooks/administrator/useUsers'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'

import languages from '~data/languages'

type Props = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

function UserKeywordsDialog({ userId, setUserId }: Props) {
  const { users } = useUsers()

  const user = users.find(user => user.id === userId) ?? null
  const debouncedUser = useDebounce(user, 300)
  const finalUser = user ?? debouncedUser

  const handleClose = useCallback(() => {
    setUserId('')
  }, [
    setUserId,
  ])

  const handleKeyword = useCallback((language: string, keyword: string, delta: number) => {
    if (!user) return

    updateDoc(doc(db, 'users', user.id), {
      [`character.keywords.${language}.${keyword}`]: Math.max(0, (user?.character.keywords[language]?.[keyword] ?? 0) + delta),
    })
  }, [
    user,
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
            <div key={language.name}>
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
                    {finalUser?.character.keywords[languageKey]?.[keyword] ?? 0}
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
      </DialogContent>
    </Dialog>
  )
}

export default UserKeywordsDialog
