import {
  ContainerType,
  PossessionType,
  TagType,
  Action,
} from '~/packlets/commons/constants'

export type ISOTimestamp = string

export interface Tag {
  id: string
  // if tag doesn't linked to anything yet, link is null
  link: {
    id: string
    type: TagType
  } | null
  createdAt: ISOTimestamp
  updatedAt: ISOTimestamp
}

export interface Item {
  id: string
  name: string
  description: string
  notes: string
  imageUrl?: string
  type: TagType.Item
  tagId?: string
  possession: {
    type: PossessionType
    // if a possession type is user, then id is user id.
    // otherwise, it's container id.
    id: string
  }
  createdAt: ISOTimestamp
  updatedAt: ISOTimestamp
}

export interface Container {
  id: string
  name: string
  description: string
  notes: string
  imageUrl?: string
  type: TagType.Container
  containerType: ContainerType
  tagId?: string
  // possession can be null if a container is a place
  possession: {
    type: PossessionType
    // if a possession type is user, then id is user id.
    // otherwise, it's container id.
    id: string
  } | null
  createdAt: ISOTimestamp
  updatedAt: ISOTimestamp
}

export interface Log {
  id: string
  action: Action
  node: {
    id: string
    // tag doesn't have type
    type?: TagType
  }
  // if action is tag, then target is id of a tag
  // if action is check-in, then target is destination container id or user id
  // if action is created or updated, then there's no target
  target?: {
    id: string

    // these 2 fields will not exist only when action is Action.Tagged
    name?: string
    // TagType only be used when action is Action.PutIn and Action.PutOut
    type?: PossessionType | TagType

  }
  createdAt: ISOTimestamp
}
