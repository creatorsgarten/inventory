import { VStack, chakra, Box, Text } from '@chakra-ui/react'
import {
  FunctionComponent, Suspense,
  useRef,
} from 'react'

import { useQRScanner } from './useQRScanner'

interface Props {
  onScan?: (url: string) => void
}

const LoadedScanner: FunctionComponent<Props> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const { initErrorMessage } = useQRScanner(videoRef, {
    onResult: result => onScan?.(result.data),
    onError: err => console.error(err),
  })

  if (initErrorMessage)
    return (
      <Box w="100%" border="1px" rounded="xl" py={16} borderStyle="dashed" borderColor="gray.500" textAlign="center">
        <Text fontSize="md" fontWeight="bold">{initErrorMessage}</Text>
      </Box>
    )

  return (
    <VStack align="start">
      <chakra.video
        ref={videoRef}
        w="100%"
        aspectRatio={1}
        objectFit="cover"
      />
    </VStack>
  )
}

export const QRCodeScanner: FunctionComponent<Props> = props => {
  const fallback = (
    <Box w="100%" border="1px" rounded="xl" py={16} borderStyle="dashed" borderColor="gray.500" textAlign="center">
      <Text fontSize="md" fontWeight="bold">Initializing QR code scanner</Text>
    </Box>
  )

  return (
    <Suspense fallback={fallback}>
      <LoadedScanner {...props} />
    </Suspense>
  )
}
