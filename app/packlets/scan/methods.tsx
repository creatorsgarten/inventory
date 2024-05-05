import { VStack } from '@chakra-ui/react'

import { Method } from '~/packlets/scan/method'
import { ScanMethod } from '~/packlets/scan/constants'

export const Methods = () => {
  return (
    <VStack spacing={4}>
      <Method
        title="Tap a NFC"
        description="Choose this option if you want to identify item by using your phone to tap on NFC tag."
        icon="lucide:cpu"
        value={ScanMethod.NFC}
      />
      <Method
        title="Scan QR code"
        description="Choose this option if you want to identify item by using camera to scan QR code."
        icon="lucide:scan-barcode"
        value={ScanMethod.QR}
      />
      <Method
        title="Input manually"
        description="Choose this option if you want to manually type item's ID."
        icon="lucide:text-cursor-input"
        value={ScanMethod.Manual}
      />
    </VStack>
  )
}
