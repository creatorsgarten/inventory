import { chakra, Box, Text } from '@chakra-ui/react'
import {
  FunctionComponent, PropsWithChildren, Suspense,
} from 'react'
import { QRScanner } from '@rayriffy/qr-scanner'

interface Props {
  onScan?: (url: string) => void
}

const Fallback: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Box w="100%" border="1px" rounded="xl" py={16} borderStyle="dashed" borderColor="gray.500" textAlign="center">
      <Text fontSize="md" fontWeight="bold">{children}</Text>
    </Box>
  )
}

const CQRScanner = chakra(QRScanner)

export const QRCodeScanner: FunctionComponent<Props> = ({ onScan }) => {
  return (
    <Suspense
      fallback={<Fallback>Initializing QR code scanner</Fallback>}
    >
      <CQRScanner
        error={message => <Fallback>{message}</Fallback>}
        onScan={onScan}
      />
    </Suspense>
  )
}
