import { Box, Text } from '@chakra-ui/react'
import { Suspense } from 'react'

import { QRScanner } from 'app/packlets/qrCodeScanner'
import { useStepsUrlHandler } from '~/packlets/scan/useStepsUrlHandler'

export const QR = () => {
  const { setItem } = useStepsUrlHandler()

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
