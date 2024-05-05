import { mockContainers } from '~/packlets/mocks/containers'
import { Container } from '~/packlets/commons/types'

export const getContainerByTagId = async (tagId: string): Promise<Container | null> => mockContainers[0]
