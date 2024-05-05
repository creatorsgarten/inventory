import { mockContainers } from '~/packlets/mocks/containers'
import { Container } from '~/packlets/commons/types'

export const getContainers = async (): Promise<Container[]> => mockContainers
