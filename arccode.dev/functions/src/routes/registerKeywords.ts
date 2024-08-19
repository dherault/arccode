import { onRequest } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions/v1'

import { getUserFromRequest } from '../authentication/getUser'
import processKeywords from '../logic/processKeywords'

// Routes with onRequest and cors are called from the extension
const registerKeywords = onRequest({ cors: true }, async (request, response) => {
  const { user, userDocument } = await getUserFromRequest(request)

  if (!(user && userDocument)) {
    response.status(401).send()

    return
  }

  logger.log(`Updating keywords for ${user.id}`)

  const userPayload = processKeywords(user, request.body.keywords)

  if (!userPayload) {
    response.status(400).send()

    return
  }

  await userDocument.update(userPayload)

  response.status(200).send()
})

export default registerKeywords
