import { Item } from '~/packlets/commons/types'
import { mockItems } from '~/packlets/mocks/items'

export const getItems = async (): Promise<Item[]> => mockItems
