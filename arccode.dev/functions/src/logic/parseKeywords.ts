import { logger } from 'firebase-functions'
import { z } from 'zod'

import type { KeywordRegistry } from '~types'

const keywordRegistrySchema = z.object({}).catchall(z.object({}).catchall(z.number().nonnegative().finite()))

function parseKeywords(keywords: unknown) {
  try {
    return keywordRegistrySchema.parse(keywords) as KeywordRegistry
  }
  catch (error) {
    logger.error('Invalid keywords', keywords, error)

    return null
  }
}

export default parseKeywords
