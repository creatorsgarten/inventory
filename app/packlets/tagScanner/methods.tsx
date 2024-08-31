import { VStack } from '@chakra-ui/react'

import { FunctionComponent } from 'react'
import { ScanMethod } from '~/packlets/tagScanner/constants'
import { Method } from '~/packlets/tagScanner/method'

interface Props {
  allowedMethods?: ScanMethod[]
}

export const Methods: FunctionComponent<Props> = ({ allowedMethods }) => {
  return (
    <VStack spacing={4}>
      {(!allowedMethods || allowedMethods?.includes(ScanMethod.NFC)) && (
        <Method
          title="Tap a NFC"
          description="Choose this option if you want to identify item by using your phone to tap on NFC tag."
          icon="lucide:cpu"
          value={ScanMethod.NFC}
        />
      )}
      {(!allowedMethods || allowedMethods?.includes(ScanMethod.QR)) && (
        <Method
          title="Scan QR code"
          description="Choose this option if you want to identify item by using camera to scan QR code."
          icon="lucide:scan-barcode"
          value={ScanMethod.QR}
        />
      )}
      {(!allowedMethods || allowedMethods?.includes(ScanMethod.Manual)) && (
        <Method
          title="Input manually"
          description="Choose this option if you want to manually type item's ID."
          icon="lucide:text-cursor-input"
          value={ScanMethod.Manual}
        />
      )}
    </VStack>
  )
}
