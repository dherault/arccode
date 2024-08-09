// From https://github.com/mui/material-ui/blob/0432934ec306458b6ff11e6572d1419fe2ab96e1/packages/mui-utils/src/useForkRef.ts
import { Ref, useMemo } from 'react'

function setRef<T>(
  ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T | null,
): void {
  if (typeof ref === 'function') ref(value)
  else if (ref) ref.current = value
}

export default function useForkedRef<InstanceA, InstanceB>(
  refA: Ref<InstanceA> | null | undefined,
  refB: Ref<InstanceB> | null | undefined,
): Ref<InstanceA & InstanceB> | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }

    return refValue => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}
