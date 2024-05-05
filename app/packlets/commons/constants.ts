export enum TagType {
  Item = 'item',
  Container = 'container',
}

export enum ContainerType {
  // box container will be allowed to contain items within it
  Box = 'box',
  // place container is a location, it cannot be put inside another container
  Place = 'place',
}

export enum PossessionType {
  // it's currently in user hand
  User = 'user',
  // it's currently in a container
  Container = 'container',
}

export enum Action {
  CheckIn = 'check-in',
  Tagged = 'tag',
  Created = 'created',
  Updated = 'updated',
  PutIn = 'put-in',
  PutOut = 'put-out',
}
