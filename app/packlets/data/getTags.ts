import { mockTags } from '~/packlets/mocks/tags'
import { Tag } from '~/packlets/commons/types'

export const getTags = async (): Promise<Tag[]> => mockTags
