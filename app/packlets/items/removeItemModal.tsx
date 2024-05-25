import {
  Modal, ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Button, IconButton, useDisclosure } from '@chakra-ui/react'
import { Fragment, FunctionComponent } from 'react'

import {
  useRemoveItemModalHandler
} from '~/packlets/items/useRemoveItemModalHandler'
import { Icon } from '~/packlets/commons/icon'

interface Props {
  id: string
  name: string
}

export const RemoveItemModal: FunctionComponent<Props> = ({ id, name }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { handle, loading, error } = useRemoveItemModalHandler(onClose)

  return (
    <Fragment>
      <IconButton onClick={onOpen} aria-label="See" size="sm" colorScheme="red" icon={<Icon icon="lucide:trash" />}></IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Removing item</ModalHeader>
          <ModalBody>
            You're about to remove <b>{name}</b> from inventory. Are you sure to proceed?
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              No, go back!
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handle(id)}
              isLoading={loading}
              loadingText="Removing..."
            >Yes, remove it</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}
