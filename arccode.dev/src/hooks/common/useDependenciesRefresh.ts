import { useEffect, useState } from 'react'

function useDependenciesRefresh(dependencies: any[]) {
  const [, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRefresh(x => !x)
    }, 2)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

}

export default useDependenciesRefresh
