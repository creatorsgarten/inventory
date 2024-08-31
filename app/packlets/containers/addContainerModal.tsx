import { ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/modal'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useNavigate } from '@remix-run/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Icon } from '~/packlets/commons/icon'
import { QueryStringModal } from '~/packlets/commons/queryStringModal'
import { useGetCurrentUrlWithQueryString } from '~/packlets/commons/useGetCurrentUrlWithQueryString'
import { ContainersQueryStringKeys } from '~/packlets/containers/constants'
import { useAddContainerHandler } from '~/packlets/containers/useAddContainerHandler'
import { TagScanner } from '~/packlets/tagScanner'
import {
  ScanMethod,
  TagScannerQueryString,
} from '~/packlets/tagScanner/constants'

interface ModalContentProps {
  onClose: () => void
}

interface ModalTagScannerProps {
  onClose: () => void
  setValue: (key: string, value: string) => void
}

interface FormValue {
  name: string
  description: string
  tag: string
}

const ModalTagScanner: FunctionComponent<ModalTagScannerProps> = ({
  onClose,
  setValue,
}) => {
  const navigate = useNavigate()
  const closeUrl = useGetCurrentUrlWithQueryString({
    [TagScannerQueryString.Method]: undefined,
    [TagScannerQueryString.Tag]: undefined,
  })

  const handleClose = () => {
    navigate(closeUrl)
    onClose()
  }

  /**
   * Inline component
   */
  interface InnerTag {
    tag: string
  }
  const InnerTag: FunctionComponent<InnerTag> = ({ tag }) => {
    useEffect(() => {
      if (typeof tag === 'string') {
        setValue('tag', tag)
        handleClose()
      }
    }, [tag])

    return <></>
  }

  return (
    <>
      <ModalBody>
        <TagScanner allowedMethods={[ScanMethod.Manual, ScanMethod.QR]}>
          {tag => <InnerTag tag={tag} />}
        </TagScanner>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="gray" onClick={handleClose}>
          Back
        </Button>
      </ModalFooter>
    </>
  )
}

const ModalContent: FunctionComponent<ModalContentProps> = ({ onClose }) => {
  const toast = useToast()

  const { mutateAsync } = useAddContainerHandler({
    onSuccess: () => {
      toast({
        title: 'Container created.',
        description: "We've created a new container for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onClose()
    },
  })
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()
  const [tagScan, setTagScan] = useState(false)

  if (tagScan)
    return (
      <ModalTagScanner onClose={() => setTagScan(false)} setValue={setValue} />
    )

  return (
    <form onSubmit={handleSubmit(v => mutateAsync(v))}>
      <ModalBody>
        <FormControl isInvalid={errors.name !== undefined}>
          <FormLabel htmlFor="name">Container name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description !== undefined} pt={2}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="description"
            {...register('description', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.tag !== undefined} pt={2}>
          <FormLabel htmlFor="tag">Tag ID</FormLabel>
          <Flex gap={2}>
            <Input
              id="tag"
              placeholder="tag"
              disabled
              {...register('tag', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <IconButton
              aria-label={'Scan tag'}
              size="md"
              icon={<Icon icon="lucide:scan-line" />}
              onClick={() => setTagScan(true)}
            ></IconButton>
          </Flex>
          <FormErrorMessage>
            {errors.tag && errors.tag.message}
          </FormErrorMessage>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="gray" onClick={onClose}>
          Close
        </Button>
        <Button
          ml={3}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </ModalFooter>
    </form>
  )
}

export const AddContainerModal = () => {
  return (
    <QueryStringModal query={ContainersQueryStringKeys.AddModal}>
      {({ onClose }) => (
        <>
          <ModalHeader>Add Container</ModalHeader>
          <ModalContent {...{ onClose }} />
        </>
      )}
    </QueryStringModal>
  )
}
