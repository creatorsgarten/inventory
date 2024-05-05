import dayjs from 'dayjs'

import { Container } from '~/packlets/commons/types'
import { TagType, PossessionType, ContainerType } from '~/packlets/commons/constants'

export const mockContainers: Container[] = [
  {
    id: 'container01',
    name: 'Cardboard Box',
    description: 'This is container 1',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Box,
    // simulate box is in garden zero
    possession: {
      type: PossessionType.Container,
      id: 'user01',
    },
    createdAt: dayjs().subtract(1, 'day'),
    updatedAt: dayjs().subtract(1, 'hour'),
  },
  {
    id: 'container02',
    name: 'Garden Zero',
    description: 'This is container 2',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Place,
    possession: null,
    createdAt: dayjs().subtract(2, 'day'),
    updatedAt: dayjs().subtract(2, 'hour'),
  },
  {
    id: 'container03',
    name: 'Tech Pounch',
    description: 'This is container 3',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Box,
    // tech pouch is with user
    possession: {
      type: PossessionType.User,
      id: 'user01',
    },
    createdAt: dayjs().subtract(3, 'day'),
    updatedAt: dayjs().subtract(3, 'hour'),
  },
  {
    id: 'container04',
    name: 'Coin Wallet',
    description: 'This is container 4',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Box,
    // the wallet is inside a box
    possession: {
      type: PossessionType.Container,
      id: 'container01',
    },
    createdAt: dayjs().subtract(3, 'day'),
    updatedAt: dayjs().subtract(3, 'hour'),
  },
]
