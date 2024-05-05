import {
  ContainerType,
  PossessionType,
  TagType,
} from '~/packlets/commons/constants'

export interface Tag {
  id: string
  // if tag doesn't linked to anything yet, link is null
  link: {
    id: string
    type: TagType
  } | null
  createdAt: Date
  updatedAt: Date
}

export interface Item {
  id: string
  name: string
  description: string
  imageUrl?: string
  type: TagType.Item
  possession: {
    type: PossessionType
    // if a possession type is user, then id is user id.
    // otherwise, it's container id.
    id: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface Container {
  id: string
  name: string
  description: string
  imageUrl?: string
  type: TagType.Container
  containerType: ContainerType
  // possession can be null if a container is a place
  possession: {
    type: PossessionType
    // if a possession type is user, then id is user id.
    // otherwise, it's container id.
    id: string
  } | null
  createdAt: Date
  updatedAt: Date
}
