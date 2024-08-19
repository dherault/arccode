import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { logger } from 'firebase-functions/v2'
import { DateTime } from 'luxon'

import type { User } from '~types'

import { firestore } from '../firebase'
import { getUserFromCallableRequest } from '../authentication/getUser'

async function sendRecapEmails() {
  logger.log('Sending recap emails')

  const yesterday = DateTime.now().minus({ days: 1 }).toISO()
  const almostYesterday = DateTime.now().minus({ days: 1, minutes: 5 }).toISO()

  const users = await firestore.collection('users')
      .where('updatedAt', '>=', yesterday)
      .where('sentDailyRecapEmailAt', '<=', almostYesterday)
      .where('hasConnectedExtension', '==', true)
      .get()

  console.log('users.length', users.docs.length)

  for (const userDoc of users.docs) {
    const user = userDoc.data() as User

    console.log('user.character.name', user.character.name)
  }
}

export const sendRecapEmailsCron = onSchedule('every 1 hours', sendRecapEmails)

export const sendRecapEmailsRequest = onCall(async request => {
  const { user: administratorUser } = await getUserFromCallableRequest(request)

  if (!administratorUser) throw new HttpsError('permission-denied', 'You are not authenticated')
  if (!administratorUser.isAdministrator) throw new HttpsError('permission-denied', 'You are not an administrator')

  await sendRecapEmails()

  return {
    message: 'ok',
  }
})
