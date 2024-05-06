import { useLocation, useNavigate } from '@remix-run/react'
import { useMemo } from 'react'

import { ScanMethod } from '~/packlets/tagScanner/constants'

interface Handler {
  method: ScanMethod | null
  tag: string | null
  setMethod: (method: ScanMethod) => void
  resetMethod: () => void
  setTag: (tag: string) => void
  resetTag: () => void
}

export const useTagScannerUrlHandler = (): Handler => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])

  const setMethod = (method: ScanMethod) => {
    searchParams.set('method', method)
    navigate({ search: searchParams.toString() })
  }

  const resetMethod = () => {
    searchParams.delete('method')
    navigate({ search: searchParams.toString() })
  }

  const setTag = (item: string) => {
    searchParams.set('tag', item)
    navigate({ search: searchParams.toString() })
  }

  const resetTag = () => {
    searchParams.delete('tag')
    navigate({ search: searchParams.toString() })
  }

  return {
    method: searchParams.get('method') as ScanMethod,
    tag: searchParams.get('tag'),
    setMethod,
    resetMethod,
    setTag,
    resetTag,
  }
}
