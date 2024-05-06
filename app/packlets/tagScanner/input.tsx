import {
  useTagScannerUrlHandler,
} from '~/packlets/tagScanner/useTagScannerUrlHandler'
import { ScanMethod } from '~/packlets/tagScanner/constants'
import { Manual } from '~/packlets/tagScanner/manual'
import { QR } from '~/packlets/tagScanner/qr'

export const Input = () => {
  const { method } = useTagScannerUrlHandler()

  if (method === ScanMethod.Manual)
    return <Manual />
  else if (method === ScanMethod.QR)
    return <QR />

  return null
}
