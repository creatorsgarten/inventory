import { Log } from '~/packlets/commons/types'
import { mockTagLogs } from '~/packlets/mocks/logs'

export const getTagLogs = async (tagId: string): Promise<Log[]> => mockTagLogs
