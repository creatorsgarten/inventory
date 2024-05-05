import { mockContainers } from '~/packlets/mocks/containers'
import { Container } from '~/packlets/commons/types'

export const getContainerById = async (containerId: string): Promise<Container | null> => mockContainers[0]
