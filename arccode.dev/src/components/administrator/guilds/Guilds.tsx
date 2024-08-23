import { doc, writeBatch } from 'firebase/firestore'
import { useCallback, useState } from 'react'
import { nanoid } from 'nanoid'

import type { Guild } from '~types'

import { db } from '~firebase'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'
import Spinner from '~components/common/Spinner'

const emojies = ['🎉', '🎈', '🎁', '🎊', '🎂', '🎃', '🎄', '🎅', '🎆', '🎇', '🧨', '🎗️', '🏵️', '🎖️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎮', '🕹️', '🎲', '🧩', '🎨', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎬', '🎥', '📷', '📸', '📹', '🎞️', '📽️', '🎦', '🏟️', '🎪', '🎭', '🩰', '🎨', '🎪', '🎤', '🎹', '🎻', '🎺', '🎷', '🥁', '🎬', '🎭', '🎨', '🎯', '🎳', '🎮', '🎰', '🎱', '🎲', '🎴', '🀄', '🃏', '🎸', '🪕', '🎤', '🎧', '🎼', '🎶', '🎵', '🎚️', '🎛️', '🎙️', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹']

function Guilds() {
  const { user } = useUser()

  const [loading, setLoading] = useState(false)
  const [createGuildSuccess, setCreateGuildSuccess] = useState(false)

  const handleCreateGuilds = useCallback(async (n: number, isPrivate = false, includeMemberIds = false) => {
    if (!user) return

    setLoading(true)
    setCreateGuildSuccess(false)

    const batch = writeBatch(db)
    const now = Date.now()

    const repsonse = await fetch(`https://fakerapi.it/api/v1/texts?_quantity=${n}&_characters=128`)
    const { data } = await repsonse.json()

    for (let i = 0; i < n; i++) {
      const createdAt = new Date(now + i).toISOString()
      const guild: Guild = {
        id: nanoid(),
        name: Math.random() < 0.8 ? data[i].title : data[i].title + data[i].title + data[i].title,
        description: data[i].content,
        emoji: emojies[Math.floor(Math.random() * emojies.length)],
        isPrivate,
        administratorIds: [user.id],
        moderatorIds: [user.id],
        memberIds: includeMemberIds ? [user.id] : [],
        userId: user.id,
        lastMessageAt: createdAt,
        createdAt,
        updatedAt: createdAt,
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
        <Button onClick={() => handleCreateGuilds(10)}>
          Create 10 public guilds
        </Button>
        <Button onClick={() => handleCreateGuilds(10, true)}>
          Create 10 private guilds without memberIds
        </Button>
        <Button onClick={() => handleCreateGuilds(10, true, true)}>
          Create 10 private guilds with memberIds
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
