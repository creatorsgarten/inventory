import dayjs from 'dayjs'

import { Item } from '~/packlets/commons/types'
import { TagType, PossessionType } from '~/packlets/commons/constants'


export const mockItems: Item[] = [
  {
    id: 'item01',
    name: 'Item 1',
    description: 'This is item 1',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Item,
    tagId: 'CG00001',
    // this item is with user
    possession: {
      type: PossessionType.User,
      id: 'user01',
    },
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'hour').toISOString(),
  },
  {
    id: 'item02',
    name: 'Item 2',
    description: 'This is item 2',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Item,
    tagId: 'CG00002',
    // this item is with box
    possession: {
      type: PossessionType.Container,
      id: 'container01',
    },
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'hour').toISOString(),
  },
  // this item does not have tag
  {
    id: 'item03',
    name: 'Item 3',
    description: 'This is item 3',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imageUrl: 'https://placehold.co/600x400',
    type: TagType.Item,
    // this item is in place
    possession: {
      type: PossessionType.Container,
      id: 'container02',
    },
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'hour').toISOString(),
  },
]
