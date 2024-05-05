import { mockItems } from '~/packlets/mocks/items'
import { Item } from '~/packlets/commons/types'

export const getItemsByContainerId = async (containerId: string): Promise<Item[]> => mockItems
