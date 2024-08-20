import { FieldValue } from 'firebase-admin/firestore'
import { DateTime } from 'luxon'
import sendRecapEmail from 'emails/recap'
import { diffKeywordRegistries, sumKeywordRegistry } from 'arccode-core'

import type { User } from '~types'

import { firestore } from '../firebase'

import getTimezoneOffsetAtHour from './getTimezoneOffsetAtHour'

const IS_DEV = process.env.IS_FIREBASE_CLI === 'true'
const RECAP_HOUR = IS_DEV
  ? 8 // HACK to set the recap hour to current hour in development. Modify this
  : 18

async function sendRecapEmails() {
  const timezoneOffset = getTimezoneOffsetAtHour(RECAP_HOUR)

  if (timezoneOffset === null) return 0

  const yesterday = DateTime.now().minus({ days: 1 }).toISO()
  const aBitBeforeYesterday = DateTime.now().minus({ days: 1, minutes: 5 }).toISO()

  const users = await firestore.collection('users')
      .where('hasConnectedExtension', '==', true)
      .where('updatedAt', '>=', yesterday)
      .where('sentDailyRecapEmailAt', '<=', aBitBeforeYesterday)
      .where('timezoneOffset', '==', timezoneOffset)
      .get()

  let count = 0

  for (const userDoc of users.docs) {
    const user = userDoc.data() as User

    if (!user.email) continue

    const keywordRegistry = diffKeywordRegistries(user.character.keywordRegistry, user.character.lastDailyRecapKeywordRegistry)

    if (!Object.keys(keywordRegistry).length) continue
    if (!Object.keys(user.character.levelUpKeywordRegistry).length) continue

    const levelUpCount = sumKeywordRegistry(user.character.levelUpKeywordRegistry)

    if (!levelUpCount) continue

    await sendRecapEmail({
      email: IS_DEV ? 'delivered@resend.dev' : user.email,
      name: user.character.name,
      levelUpCount,
      keywordRegistry,
      levelUpKeywordRegistry: user.character.levelUpKeywordRegistry,
      period: 'daily',
    })

    count++

    // Do not update user if in development to test again and again
    if (IS_DEV) continue

    const userUpdatePayload: Partial<Record<keyof User, any>> = {
      updatedAt: new Date().toISOString(),
      nUpdates: FieldValue.increment(1),
      sentDailyRecapEmailAt: new Date().toISOString(),
    }

    await userDoc.ref.update(userUpdatePayload)
  }

  return count
}

export default sendRecapEmails
