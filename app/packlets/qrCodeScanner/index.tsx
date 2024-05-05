import { Box, Text } from '@chakra-ui/react'
import { FunctionComponent, Suspense, useEffect } from 'react'

import { readerStateAtom } from './readerStateAtom'
import { Scanner } from './scanner'

interface Props {
  onScan?: (id: string) => void
}

export const QRScanner: FunctionComponent<Props> = ({ onScan }) => {
  useEffect(() => {
    readerStateAtom.set('start')

    return () => {
      readerStateAtom.set('stop')
    }
  }, [])

  const fallback = (
    <Box w="100%" border="1px" rounded="xl" py={16} borderStyle="dashed" borderColor="gray.500" textAlign="center">
      <Text fontSize="md" fontWeight="bold">Initializing QR code scanner</Text>
    </Box>
  )

  return (
    <Suspense fallback={fallback}>
      <Scanner onScan={onScan} />
    </Suspense>
  )
}
