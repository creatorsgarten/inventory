import { FunctionComponent, memo } from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'

import { Link } from '~/ui/Link'

interface Props {
  id: string
}

export const Tag: FunctionComponent<Props> = ({ id }) => (
  <Link to={'/tags/' + id} color="black">
    <HStack>
      <Icon icon="lucide:cpu" />
      <Text fontWeight="medium">{id}</Text>
    </HStack>
  </Link>
)
