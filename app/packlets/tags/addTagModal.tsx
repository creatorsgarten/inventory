import { ModalHeader } from '@chakra-ui/modal'

import { QueryStringModal } from '~/packlets/commons/queryStringModal'
import { TagsQueryStringKeys } from '~/packlets/tags/constants'

export const AddTagModal = () => {
  return (
    <QueryStringModal query={TagsQueryStringKeys.AddModal}>
      {() => <ModalHeader>Add Item</ModalHeader>}
    </QueryStringModal>
  )
}
