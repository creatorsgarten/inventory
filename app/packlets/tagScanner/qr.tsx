import { QRCodeScanner } from '~/packlets/qrCodeScanner'

import { useTagScannerUrlHandler } from '~/packlets/tagScanner/useTagScannerUrlHandler'

export const QR = () => {
  const { setTag } = useTagScannerUrlHandler()

  return <QRCodeScanner onScan={id => setTag(id)} />
}
