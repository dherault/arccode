import { onRequest } from 'firebase-functions/v2/https'
import { FieldValue } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions/v1'

import { getUserFromRequest } from '../authentication/getUser'

// Routes with onRequest and cors are called from the extension
const activateVscodeExtension = onRequest({ cors: true }, async (request, response) => {
  const { user, userDocument } = await getUserFromRequest(request)

  if (!(user && userDocument)) {
    response.status(401).send()

    return
  }

  logger.log(`Activating extension for ${user.id}`)

  const payload: Record<string, any> = {
    hasConnectedExtension: true,
    updatedAt: FieldValue.serverTimestamp(),
    nUpdates: FieldValue.increment(1),
  }

  await userDocument.update(payload)

  response.status(200).send()
})

export default activateVscodeExtension
