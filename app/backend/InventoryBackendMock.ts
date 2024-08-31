import { atom } from 'nanostores'

import { mockItems } from '~/packlets/mocks/items'
import { Item, Tag } from '~/packlets/commons/types'
import { mockTags } from '~/packlets/mocks/tags'

import {
  AuthState,
  DescribeInventoryItemsOptions,
  InventoryBackend,
} from './InventoryBackend'

export class InventoryBackendMock implements InventoryBackend {
  $authState = atom<AuthState>({
    type: 'authenticated',
    user: {
      uid: 'dummy',
      name: 'Mock user',
    },
  })

  logOut = async () => {
    this.$authState.set({ type: 'unauthenticated' })
  }

  async describeInventoryItems(
    options: DescribeInventoryItemsOptions
  ): Promise<Item[]> {
    const items = mockItems
    return options.id ? items.filter(item => item.id === options.id) : items
  }

  async describeTags(): Promise<Tag[]> {
    return mockTags
  }
}
