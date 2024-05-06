import { Box, Text } from '@chakra-ui/react'
import { Suspense } from 'react'

import { QRScanner } from '~/packlets/qrCodeScanner'

import { useTagScannerUrlHandler } from '~/packlets/tagScanner/useTagScannerUrlHandler'

export const QR = () => {
  const { setItem } = useTagScannerUrlHandler()

  const fallback = (
    <Box w="100%" border="1px" rounded="xl" py={16} borderStyle="dashed" borderColor="gray.500" textAlign="center">
      <Text fontSize="md" fontWeight="bold">Initializing QR code scanner</Text>
    </Box>
  )

  return (
    <Suspense fallback={fallback}>
      <QRScanner onScan={id => setItem(id)} />
    </Suspense>
  )
}
