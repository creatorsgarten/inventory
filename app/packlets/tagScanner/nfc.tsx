import { Box, Text, Spinner, Container } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'
import { useLocation } from '@remix-run/react'
import { useEffect } from 'react'

import {
  nfcMonitorAtom,
  useNFCMonitorAtom,
} from '~/packlets/tagScanner/nfcMonitorAtom'

export const NFC = () => {
  const nfcMonitor = useNFCMonitorAtom()
  const location = useLocation()

  useEffect(() => {
    nfcMonitorAtom.set({
      source: {
        pathname: location.pathname,
        search: location.search,
      },
      searchKey: 'tag',
    })
  }, [location])

  if (nfcMonitor === null)
    return (
      <Box
        w="100%"
        border="1px"
        rounded="xl"
        py={16}
        borderStyle="dashed"
        borderColor="gray.500"
        textAlign="center"
      >
        <Spinner size="md" />
        <Text fontSize="md" fontWeight="bold" pt={2}>
          Initializing NFC scanner
        </Text>
      </Box>
    )

  return (
    <Container
      maxW="container.sm"
      border="1px"
      rounded="xl"
      py={16}
      borderStyle="dashed"
      borderColor="gray.500"
      textAlign="center"
    >
      <Icon icon="lucide:smartphone-nfc" width={32} height={32} />
      <Text fontSize="md" fontWeight="bold" pt={2}>
        Ready to scan
      </Text>
      <Text fontSize="sm">
        You&apos;re ready to tap an NFC tag, this will open a new browser tab.
        This tab can be close safely.
      </Text>
    </Container>
  )
}
