import { useLocation, useNavigate } from '@remix-run/react'
import { useMemo } from 'react'

import { ScanMethod } from '~/packlets/tagScanner/constants'

interface Handler {
  method: ScanMethod | null
  item: string | null
  setMethod: (method: ScanMethod) => void
  resetMethod: () => void
  setItem: (item: string) => void
  resetItem: () => void
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

  const setItem = (item: string) => {
    searchParams.set('item', item)
    navigate({ search: searchParams.toString() })
  }

  const resetItem = () => {
    searchParams.delete('item')
    navigate({ search: searchParams.toString() })
  }

  return {
    method: searchParams.get('method') as ScanMethod,
    item: searchParams.get('item'),
    setMethod,
    resetMethod,
    setItem,
    resetItem,
  }
}
