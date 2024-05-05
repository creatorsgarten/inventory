import { memo } from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'

import { Link } from '~/ui/Link'

interface Props {
  id: string
}

// eslint-disable-next-line react/prop-types
export const Tag = memo<Props>(({ id }) => (
  <Link to={'/tags/' + id} color="black">
    <HStack>
      <Icon icon="lucide:cpu" />
      <Text fontWeight="medium">{id}</Text>
    </HStack>
  </Link>
))

Tag.displayName = 'Tag'
