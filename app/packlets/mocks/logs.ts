import dayjs from 'dayjs'

import { Log } from '~/packlets/commons/types'
import { Action, PossessionType, TagType } from '~/packlets/commons/constants'

export const mockItemLogs: Log[] = [
  // item created
  {
    id: 'log01',
    action: Action.Created,
    node: {
      id: 'item01',
      type: TagType.Item
    },
    createdAt: dayjs('2020-12-31').toISOString()
  },
  // item has been linked with tag
  {
    id: 'log02',
    action: Action.Tagged,
    node: {
      id: 'item01',
      type: TagType.Item
    },
    target: {
      id: 'tag01'
    },
    createdAt: dayjs('2021-01-01').toISOString()
  },
  // item has been transferred to container
  {
    id: 'log03',
    action: Action.CheckIn,
    node: {
      id: 'item01',
      type: TagType.Item
    },
    target: {
      id: 'container01',
      name: 'Cardboard Box',
      type: PossessionType.Container,
    },
    createdAt: dayjs('2021-01-02').toISOString()
  },
  // item information has been updated
  {
    id: 'log04',
    action: Action.Updated,
    node: {
      id: 'item01',
      type: TagType.Item
    },
    createdAt: dayjs('2021-01-02').toISOString()
  },
  // item has been transferred to user
  {
    id: 'log05',
    action: Action.CheckIn,
    node: {
      id: 'item01',
      type: TagType.Item
    },
    target: {
      id: 'user01',
      name: 'Riffy',
      type: PossessionType.User,
    },
    createdAt: dayjs('2021-01-03').toISOString()
  },
]

export const mockContainerLogs: Log[] = [
  // container has been created
  {
    id: 'log06',
    action: Action.Created,
    node: {
      id: 'container01',
      type: TagType.Container
    },
    createdAt: dayjs('2020-12-31').toISOString()
  },
  // container has been transferred to user
  {
    id: 'log07',
    action: Action.CheckIn,
    node: {
      id: 'container01',
      type: TagType.Container
    },
    target: {
      id: 'user02',
      name: 'Thai',
      type: PossessionType.User,
    },
    createdAt: dayjs('2021-01-01').toISOString()
  },
  // item01 has been put into container01
  {
    id: 'log08',
    action: Action.PutIn,
    node: {
      id: 'container01',
      type: TagType.Container
    },
    target: {
      id: 'item01',
      name: 'Macbook Pro',
      type: TagType.Item,
    },
    createdAt: dayjs('2021-01-02').toISOString()
  },
  // container03 has been put into container01
  {
    id: 'log09',
    action: Action.PutIn,
    node: {
      id: 'container01',
      type: TagType.Container
    },
    target: {
      id: 'container03',
      name: 'Tech Pouch',
      type: TagType.Container,
    },
    createdAt: dayjs('2021-01-03').toISOString()
  },
  // container01 has been transferred to place
  {
    id: 'log10',
    action: Action.CheckIn,
    node: {
      id: 'container01',
      type: TagType.Container
    },
    target: {
      id: 'container02',
      name: 'Garden Zero',
      type: PossessionType.Container,
    },
    createdAt: dayjs('2021-01-04').toISOString()
  },
  // container03 has been put out from container01
  {
    id: 'log11',
    action: Action.PutOut,
    node: {
      id: 'container01',
      type: TagType.Container
    },
    target: {
      id: 'container03',
      name: 'Tech Pouch',
      type: TagType.Container,
    },
    createdAt: dayjs('2021-01-05').toISOString()
  },
]

export const mockTagLogs: Log[] = [
  // tag has been created
  {
    id: 'log12',
    action: Action.Created,
    node: {
      id: 'tag01',
    },
    createdAt: dayjs('2020-12-31').toISOString()
  },
  // tag has been used to tag item01, THIS IS THE EXACT SAME AS log02 IN mockItemLogs
  {
    id: 'log02',
    action: Action.Tagged,
    node: {
      id: 'item01',
      type: TagType.Item
    },
    target: {
      id: 'tag01'
    },
    createdAt: dayjs('2021-01-01').toISOString()
  },
]
