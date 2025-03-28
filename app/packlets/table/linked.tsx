import { HStack, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'
import { FunctionComponent } from 'react'

import { TagType } from '~/packlets/commons/constants'
import { Link } from '~/packlets/commons/link'
import { ItemName } from '~/packlets/items/itemName'

interface Props {
  type: TagType
  id: string
}

export const Linked: FunctionComponent<Props> = ({ type, id }) => {
  return (
    <Link
      to={`/${type === TagType.Item ? 'items' : 'containers'}/${id}`}
      color="black"
    >
      <HStack>
        <Icon
          icon={type === TagType.Container ? 'lucide:container' : 'lucide:tag'}
        />
        {type === TagType.Item ? (
          <ItemName id={id} fallback={id} />
        ) : (
          <Text fontWeight="medium">{id}</Text>
        )}
      </HStack>
    </Link>
  )
}
