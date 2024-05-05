import { Log } from '~/packlets/commons/types'
import { mockContainerLogs } from '~/packlets/mocks/logs'

export const getContainerLogs = async (containerId: string): Promise<Log[]> => mockContainerLogs
