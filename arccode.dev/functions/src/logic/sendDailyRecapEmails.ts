import { logger } from 'firebase-functions/v2'
import { FieldValue } from 'firebase-admin/firestore'
import { DateTime } from 'luxon'
import { diffKeywordRegistries, filterKeywordRegistry, sumKeywordRegistry } from 'arccode-core'

import type { User } from '~types'

import { firestore } from '../firebase'
import sendRecapEmail from '../emails/recap'

import getTimezoneOffsetAtHour from './getTimezoneOffsetAtHour'

const IS_DEV = process.env.IS_FIREBASE_CLI === 'true'
const RECAP_HOUR = IS_DEV
  ? 9 // HACK to set the recap hour to current hour in development. Modify this
  : 18

async function sendDailyRecapEmails() {
  const timezoneOffset = getTimezoneOffsetAtHour(RECAP_HOUR)

  if (timezoneOffset === null) return

  const yesterday = DateTime.now().minus({ days: 1 }).toISO()
  const aBitAfterYesterday = DateTime.now().minus({ days: 1 }).plus({ minutes: 15 }).toISO()

  const users = await firestore.collection('users')
      .where('hasConnectedExtension', '==', true)
      .where('updatedAt', '>=', yesterday)
      .where('sentDailyRecapEmailAt', '<=', aBitAfterYesterday)
      .where('timezoneOffset', '==', timezoneOffset)
      .get()

  let count = 0

  logger.log(`Considering ${users.docs.length} users`)

  for (const userDoc of users.docs) {
    const user = userDoc.data() as User

    if (!user.email) continue

    logger.log(`Considering user ${user.email}`)

    const keywordRegistry = filterKeywordRegistry(diffKeywordRegistries(user.character.keywordRegistry, user.character.lastDailyRecapKeywordRegistry))

    if (!Object.keys(keywordRegistry).length) {
      logger.log('No keywordRegistry')

      continue
    }
    if (!Object.keys(user.character.levelUpKeywordRegistry).length) {
      logger.log('No levelUpKeywordRegistry')

      continue
    }

    const levelUpCount = sumKeywordRegistry(user.character.levelUpKeywordRegistry)

    if (!levelUpCount) {
      logger.log('No levelUpCount')

      continue
    }

    try {
      logger.log('Sending recap email')

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
      // if (IS_DEV) continue

      const userUpdatePayload: Record<string, any> = {
        'character.lastDailyRecapKeywordRegistry': user.character.keywordRegistry,
        sentDailyRecapEmailAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        nUpdates: FieldValue.increment(1),
      }

      await userDoc.ref.update(userUpdatePayload)
    }
    catch (error) {
      logger.error('Failed to send recap email', error)
    }
  }

  logger.log(`Sent ${count} daily recap emails`)
}

export default sendDailyRecapEmails
