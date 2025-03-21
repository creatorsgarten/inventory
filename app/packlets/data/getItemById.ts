import { backend } from '~/backend'
import { Item } from '~/packlets/commons/types'

export const getItemById = async (itemId: string): Promise<Item | null> =>
  backend.describeInventoryItems({ ids: [itemId] }).then(r => r[0] || null)
