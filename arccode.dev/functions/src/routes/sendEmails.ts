import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { logger } from 'firebase-functions/v2'

import { getUserFromCallableRequest } from '../authentication/getUser'
import sendRecapEmails from '../logic/sendRecapEmail'

export const sendRecapEmailsCron = onSchedule(
  { secrets: ['RESEND_API_KEY'], schedule: 'every 1 hours' },
  async () => {
    const count = await sendRecapEmails()

    logger.log(`Sent ${count} recap emails`)
  }
)

export const sendRecapEmailsRequest = onCall(
  { secrets: ['RESEND_API_KEY'] },
  async request => {
    const { user: administratorUser } = await getUserFromCallableRequest(request)

    if (!administratorUser) throw new HttpsError('permission-denied', 'You are not authenticated')
    if (!administratorUser.isAdministrator) throw new HttpsError('permission-denied', 'You are not an administrator')

    const count = await sendRecapEmails()

    logger.log(`Sent  ${count} recap emails`)

    return { count }
  }
)
