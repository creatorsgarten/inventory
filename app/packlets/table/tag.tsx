import { FunctionComponent } from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'

import { Link } from '~/packlets/commons/link'

interface Props {
  tags: string[]
}

export const Tag: FunctionComponent<Props> = ({ tags }) =>
  tags.map(tag => (
    <Link key={`table-tag-${tag}`} to={'/tags/' + tag} color="black">
      <HStack>
        <Icon icon="lucide:cpu" />
        <Text fontWeight="medium">{tag}</Text>
      </HStack>
    </Link>
  ))
