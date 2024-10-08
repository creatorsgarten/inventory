import { HStack, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'
import { FunctionComponent } from 'react'

import { PossessionType } from '~/packlets/commons/constants'
import { Link } from '~/packlets/commons/link'

interface Props {
  type: PossessionType
  id: string
}

export const Possession: FunctionComponent<Props> = ({ type, id }) => {
  const node = (
    <HStack textColor="black">
      <Icon
        icon={
          type === PossessionType.Container ? 'lucide:container' : 'lucide:user'
        }
      />
      <Text fontWeight="medium">{id}</Text>
    </HStack>
  )

  if (type === PossessionType.Container)
    return (
      <Link to={'/containers/' + id} color="black">
        {node}
      </Link>
    )

  return node
}
