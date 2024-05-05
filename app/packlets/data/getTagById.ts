import { mockTags } from '~/packlets/mocks/tags'
import { Tag } from '~/packlets/commons/types'

export const getTagById = async (tagId: string): Promise<Tag | null> => mockTags[0]
