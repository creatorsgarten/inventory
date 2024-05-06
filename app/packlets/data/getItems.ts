import { backend } from "~/backend"
import { Item } from "~/packlets/commons/types"

export const getItems = async (): Promise<Item[]> =>
  backend.describeInventoryItems({})
