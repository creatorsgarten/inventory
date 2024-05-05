import dayjs from 'dayjs'

import { Tag } from '~/packlets/commons/types'
import { TagType } from '~/packlets/commons/constants'

export const mockTags: Tag[] = [
  {
    id: 'CG00001',
    link: {
      id: 'itemid01',
      type: TagType.Item,
    },
    createdAt: dayjs().subtract(2, 'hour'),
    updatedAt: dayjs().subtract(5, 'minute'),
  },
  {
    id: 'CG00002',
    link: {
      id: 'container01',
      type: TagType.Container,
    },
    createdAt: dayjs().subtract(4, 'day'),
    updatedAt: dayjs().subtract(15, 'minute'),
  },
  {
    id: 'CG00003',
    link: null,
    createdAt: dayjs(),
    updatedAt: dayjs(),
  },
]
