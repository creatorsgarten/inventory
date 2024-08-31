import { useLocation, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { To } from '@remix-run/router/history'

import {
  nfcMonitorAtom,
  useNFCMonitorAtom,
} from '~/packlets/tagScanner/nfcMonitorAtom'

const tagPathRegex = /^\/tags\/([A-Z]{2}\d{5})$/
const scannerPathRegex = /^\/scan$/

export const useNFCRouteManager = () => {
  const nfcMonitor = useNFCMonitorAtom()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // take action only if atom is active
    if (
      nfcMonitor !== null &&
      location.pathname.match(scannerPathRegex) === null
    ) {
      // reset atom if location is not a matched pattern, but not reset if on scanner
      if (location.pathname.match(tagPathRegex) === null) {
        nfcMonitorAtom.set(null)
      }
      // do a redirect if the path matches patterns
      else {
        const searchParams = new URLSearchParams(nfcMonitor!.source.search)
        searchParams.append(
          nfcMonitor!.searchKey,
          location.pathname.match(tagPathRegex)![1]
        )

        const payload: To = {
          pathname: nfcMonitor!.source.pathname,
          search: searchParams.toString(),
        }

        // clear out scanner before leave
        nfcMonitorAtom.set(null)
        navigate(payload)
      }
    }
  }, [location])
}
