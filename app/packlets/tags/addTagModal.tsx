import { ModalFooter, ModalHeader } from '@chakra-ui/modal'
import {
  Box,
  Button,
  Flex,
  Heading,
  Portal,
  Text,
  useToast,
} from '@chakra-ui/react'
import { FunctionComponent, RefObject, useRef } from 'react'
import { Icon } from 'react-iconify-icon-wrapper'
import { QueryStringModal } from '~/packlets/commons/queryStringModal'
import { TagScanner } from '~/packlets/tagScanner'
import { TagsQueryStringKeys } from '~/packlets/tags/constants'
import { useAddTagHandler } from '~/packlets/tags/useAddTagHandler'

interface ConfirmDialogProps {
  value: string
  portalRef: RefObject<HTMLElement>
  onClose: () => void
}

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({
  value,
  portalRef,
  onClose,
}) => {
  const toast = useToast()
  const { mutateAsync, isLoading } = useAddTagHandler({
    onSuccess: () => {
      toast({
        title: 'Tag created.',
        description: "We've created a new tag for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onClose()
    },
  })

  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
        <Icon icon={'lucide:cpu'} width={'32px'} height={'32px'} />
        <Heading size={'md'}>{value}</Heading>
      </Flex>
      <Text size={'sm'} pt={4}>
        Are you sure to add this tag into the system? If you do, click "Confirm"
      </Text>
      <Portal containerRef={portalRef}>
        <Button
          colorScheme="blue"
          ml={3}
          isLoading={isLoading}
          onClick={() => mutateAsync(value)}
        >
          Confirm
        </Button>
      </Portal>
    </>
  )
}

export const AddTagModal = () => {
  const portalRef = useRef<HTMLElement>()

  return (
    <QueryStringModal query={TagsQueryStringKeys.AddModal}>
      {({ onClose }) => (
        <>
          <ModalHeader>Add Tag</ModalHeader>
          <Box px={6}>
            <TagScanner>
              {val => (
                <ConfirmDialog
                  portalRef={portalRef}
                  value={val}
                  onClose={onClose}
                />
              )}
            </TagScanner>
          </Box>

          <ModalFooter ref={portalRef}>
            <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </QueryStringModal>
  )
}
