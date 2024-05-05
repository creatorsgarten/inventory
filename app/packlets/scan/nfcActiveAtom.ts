import { useStore } from '@nanostores/react'
import { persistentAtom } from '@nanostores/persistent'

import { LocalStorageKeys } from '~/packlets/commons/keys'

export const nfcActiveAtom = persistentAtom<boolean>(LocalStorageKeys.NFCScanActive, false, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const useNfcActiveAtom = () => useStore(nfcActiveAtom)
