import { ModalHeader } from '@chakra-ui/modal'

import { QueryStringModal } from '~/packlets/commons/queryStringModal'
import { ItemsQueryStringKeys } from '~/packlets/items/constants'

export const AddItemModal = () => {
  return (
    <QueryStringModal query={ItemsQueryStringKeys.AddModal}>
      {() => (
        <ModalHeader>Add Item</ModalHeader>
      )}
    </QueryStringModal>
  )
}
