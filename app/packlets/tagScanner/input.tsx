import {
  useTagScannerUrlHandler,
} from '~/packlets/tagScanner/useTagScannerUrlHandler'
import { ScanMethod } from '~/packlets/tagScanner/constants'
import { Manual } from '~/packlets/tagScanner/manual'
import { QR } from '~/packlets/tagScanner/qr'
import { NFC } from '~/packlets/tagScanner/nfc'

export const Input = () => {
  const { method } = useTagScannerUrlHandler()

  if (method === ScanMethod.Manual)
    return <Manual />
  else if (method === ScanMethod.QR)
    return <QR />
  else if (method === ScanMethod.NFC)
    return <NFC />

  return null
}
