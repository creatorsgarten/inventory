import { Log } from '~/packlets/commons/types'
import { backend } from '~/backend'

export const getTagLogs = async (tagId: string): Promise<Log[]> => backend.getTagLogs(tagId)
