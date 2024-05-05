import dayjs from 'dayjs'

import { Item } from '~/packlets/commons/types'
import { TagType, PossessionType } from '~/packlets/commons/constants'


export const mockItems: Item[] = [
  {
    id: 'item01',
    name: 'Item 1',
    description: 'This is item 1',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Item,
    // this item is with user
    possession: {
      type: PossessionType.User,
      id: 'user01',
    },
    createdAt: dayjs().subtract(1, 'day'),
    updatedAt: dayjs().subtract(1, 'hour'),
  },
  {
    id: 'item02',
    name: 'Item 2',
    description: 'This is item 2',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Item,
    // this item is with box
    possession: {
      type: PossessionType.Container,
      id: 'container01',
    },
    createdAt: dayjs().subtract(2, 'day'),
    updatedAt: dayjs().subtract(2, 'hour'),
  },
  {
    id: 'item03',
    name: 'Item 3',
    description: 'This is item 3',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Item,
    // this item is in place
    possession: {
      type: PossessionType.Container,
      id: 'container02',
    },
    createdAt: dayjs().subtract(3, 'day'),
    updatedAt: dayjs().subtract(3, 'hour'),
  },
]
