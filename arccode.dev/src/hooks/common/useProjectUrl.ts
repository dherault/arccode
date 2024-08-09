import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

function useProjectUrl(suffix: string) {
  const { projectSlug } = useParams()

  return useMemo(() => `/~/${projectSlug}${suffix ? '/' : ''}${suffix}`, [projectSlug, suffix])
}

export default useProjectUrl
