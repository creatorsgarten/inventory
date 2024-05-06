import { Tag } from '~/packlets/commons/types'
import { backend } from '~/backend'

export const getTags = async (): Promise<Tag[]> => backend.describeTags({})
