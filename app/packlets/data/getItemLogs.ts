import { Log } from '~/packlets/commons/types'
import { backend } from '~/backend'

export const getItemLogs = async (itemId: string): Promise<Log[]> =>
  backend.getItemLogs(itemId)
