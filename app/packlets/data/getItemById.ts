import { Item } from '~/packlets/commons/types'
import { mockItems } from '~/packlets/mocks/items'

export const getItemById = async (itemId: string): Promise<Item | null> => mockItems[0]
