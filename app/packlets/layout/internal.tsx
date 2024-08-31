import { Box, Text } from '@chakra-ui/react'

import { backendMode } from '~/backend/backendMode'

export const Internal = () => {
  const isNonProd =
    typeof window !== 'undefined' &&
    !window.location.hostname.endsWith('creatorsgarten.org')

  if (!isNonProd) return null

  return (
    <Box bg={backendMode === 'prod' ? 'red.500' : 'yellow.500'} py={0.5}>
      <Text
        fontSize="sm"
        textTransform="uppercase"
        textColor="white"
        fontWeight="bold"
        textAlign="center"
      >
        {backendMode} mode
      </Text>
    </Box>
  )
}
