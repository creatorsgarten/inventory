import { mockItemLogs } from '~/packlets/mocks/logs'
import { Log } from '~/packlets/commons/types'

export const getItemLogs = async (itemId: string): Promise<Log[]> => mockItemLogs
