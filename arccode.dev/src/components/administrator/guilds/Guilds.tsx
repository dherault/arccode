import { doc, writeBatch } from 'firebase/firestore'
import { useCallback, useState } from 'react'
import { nanoid } from 'nanoid'

import type { Guild } from '~types'

import { db } from '~firebase'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'
import Spinner from '~components/common/Spinner'

function Guilds() {
  const { user } = useUser()

  const [loading, setLoading] = useState(false)
  const [createGuildSuccess, setCreateGuildSuccess] = useState(false)

  const handleCreateGuilds = useCallback(async (n: number) => {
    if (!user) return

    setLoading(true)
    setCreateGuildSuccess(false)

    const batch = writeBatch(db)

    for (let i = 0; i < n; i++) {
      const now = new Date().toISOString()
      const guild: Guild = {
        id: nanoid(),
        emoji: '🎉',
        name: `Guild ${i}`,
        description: 'Lorem ipsum',
        isPrivate: Math.random() < 0.1,
        administratorIds: [user.id],
        moderatorIds: [user.id],
        memberIds: [user.id],
        userId: user.id,
        createdAt: now,
        updatedAt: now,
        deletedAt: '',
      }

      batch.set(doc(db, 'guilds', guild.id), guild)
    }

    await batch.commit()

    setLoading(false)
    setCreateGuildSuccess(true)
  }, [
    user,
  ])

  return (
    <div className="container">
      <div className="flex items-center gap-2">
        <Button onClick={() => handleCreateGuilds(100)}>
          Create 100 guilds
        </Button>
        {loading && (
          <Spinner className="w-4" />
        )}
        {createGuildSuccess && (
          <div className="text-green-500 text-sm">
            Guilds created successfully
          </div>
        )}
      </div>
    </div>
  )
}

export default Guilds
