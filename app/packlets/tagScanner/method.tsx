import { Card, CardBody, Heading, HStack, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'
import { FunctionComponent } from 'react'

import { ScanMethod } from '~/packlets/tagScanner/constants'
import { useTagScannerUrlHandler } from '~/packlets/tagScanner/useTagScannerUrlHandler'

interface Props {
  title: string
  description: string
  icon: string
  value: ScanMethod
}

export const Method: FunctionComponent<Props> = ({
  title,
  description,
  icon,
  value,
}) => {
  const { setMethod } = useTagScannerUrlHandler()

  return (
    <Card
      w="100%"
      variant="outline"
      cursor="pointer"
      _hover={{
        bg: 'gray.50',
      }}
      onClick={() => setMethod(value)}
    >
      <CardBody>
        <HStack spacing={2} mb={4}>
          <Icon icon={icon} width={28} height={28} />
          <Heading size="md">{title}</Heading>
        </HStack>
        <Text fontSize="sm">{description}</Text>
      </CardBody>
    </Card>
  )
}
