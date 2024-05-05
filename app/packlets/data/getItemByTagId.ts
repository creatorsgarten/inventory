import { Item } from '~/packlets/commons/types'
import { mockItems } from '~/packlets/mocks/items'

export const getItemByTagId = async (tagId: string): Promise<Item | null> => mockItems[0]
