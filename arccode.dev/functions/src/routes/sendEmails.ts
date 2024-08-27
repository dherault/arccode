import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'

import { getUserFromCallableRequest } from '../authentication/getUser'
import sendDailyRecapEmails from '../logic/sendDailyRecapEmails'

export const sendRecapEmailsCron = onSchedule(
  { secrets: ['RESEND_API_KEY'], schedule: '0 * * * *' }, // Every hour at minute 0
  async () => {
    await sendDailyRecapEmails()
  }
)

export const sendRecapEmailsRequest = onCall(
  { secrets: ['RESEND_API_KEY'] },
  async request => {
    const { user: administratorUser } = await getUserFromCallableRequest(request)

    if (!administratorUser) throw new HttpsError('permission-denied', 'You are not authenticated')
    if (!administratorUser.isAdministrator) throw new HttpsError('permission-denied', 'You are not an administrator')

    await sendDailyRecapEmails()

    return { message: 'ok' }
  }
)
