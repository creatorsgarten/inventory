import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/react'

interface NFCMonitor {
  // full pathname with current search params before injection
  source: {
    pathname: string
    search: string
  }
  // params to be injected
  searchKey: string
}

export const nfcMonitorAtom = persistentAtom<NFCMonitor | null>(
  'nfcMonitor',
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
)

export const useNFCMonitorAtom = () => useStore(nfcMonitorAtom)
