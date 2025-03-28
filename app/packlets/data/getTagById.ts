import { backend } from '~/backend'
import { Tag } from '~/packlets/commons/types'

export const getTagById = async (tagId: string): Promise<Tag | null> =>
  backend.describeTags({ ids: [tagId] }).then(r => r[0] || null)
