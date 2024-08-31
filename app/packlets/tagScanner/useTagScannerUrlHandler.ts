import { useLocation, useNavigate } from '@remix-run/react'
import { useMemo } from 'react'

import {
  ScanMethod,
  TagScannerQueryString,
} from '~/packlets/tagScanner/constants'

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
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  const setMethod = (method: ScanMethod) => {
    searchParams.set(TagScannerQueryString.Method, method)
    navigate({ search: searchParams.toString() })
  }

  const resetMethod = () => {
    searchParams.delete(TagScannerQueryString.Method)
    navigate({ search: searchParams.toString() })
  }

  const setTag = (tag: string) => {
    searchParams.set(TagScannerQueryString.Tag, tag)
    navigate({ search: searchParams.toString() })
  }

  const resetTag = () => {
    searchParams.delete(TagScannerQueryString.Tag)
    navigate({ search: searchParams.toString() })
  }

  return {
    method: searchParams.get(TagScannerQueryString.Method) as ScanMethod,
    tag: searchParams.get(TagScannerQueryString.Tag),
    setMethod,
    resetMethod,
    setTag,
    resetTag,
  }
}
