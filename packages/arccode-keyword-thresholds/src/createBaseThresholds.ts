import type { ThresholdRegistry } from './types'

function createBaseThresholds<T extends string>(keywords: readonly T[], thresholds: ThresholdRegistry<T>) {
  return {
    ...keywords.reduce((acc, keyword) => ({
      ...acc,
      [keyword]: [4, 16, 32],
    }), {}),
    ...thresholds,
  }
}

export default createBaseThresholds
