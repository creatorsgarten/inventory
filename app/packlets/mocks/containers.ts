import dayjs from 'dayjs'

import { Container } from '~/packlets/commons/types'
import { TagType, PossessionType, ContainerType } from '~/packlets/commons/constants'

export const mockContainers: Container[] = [
  {
    id: 'container01',
    name: 'Cardboard Box',
    description: 'This is container 1',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Box,
    tagId: 'CG00004',
    // simulate box is in garden zero
    possession: {
      type: PossessionType.Container,
      id: 'user01',
    },
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'hour').toISOString(),
  },
  {
    id: 'container02',
    name: 'Garden Zero',
    description: 'This is container 2',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Place,
    tagId: 'CG00005',
    possession: null,
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'hour').toISOString(),
  },
  {
    id: 'container03',
    name: 'Tech Pounch',
    description: 'This is container 3',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Box,
    tagId: 'CG00006',
    // tech pouch is with user
    possession: {
      type: PossessionType.User,
      id: 'user01',
    },
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'hour').toISOString(),
  },
  {
    id: 'container04',
    name: 'Coin Wallet',
    description: 'This is container 4',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Container,
    containerType: ContainerType.Box,
    // the wallet is inside a box
    possession: {
      type: PossessionType.Container,
      id: 'container01',
    },
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'hour').toISOString(),
  },
]
