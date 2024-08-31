import { FunctionComponent, ReactNode, Suspense, useMemo } from 'react'
import { useLocation, useNavigate } from '@remix-run/react'
import {
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/modal'

import { useGetCurrentUrlWithQueryString } from '~/packlets/commons/useGetCurrentUrlWithQueryString'

interface Props extends Omit<ModalProps, 'children' | 'isOpen' | 'onClose'> {
  query: string
  children: (options: {
    onClose?: () => void
  }) => ReactNode
}

const Modal: FunctionComponent<Props> = ({ query, children, ...rest }) => {
  const { search } = useLocation()
  const navigate = useNavigate()

  const closeUrl = useGetCurrentUrlWithQueryString({
    [query]: undefined,
  })

  const isOpen = useMemo(
    () => new URLSearchParams(search).get(query) === 'true',
    [search, query]
  )

  const handleClose = () => navigate(closeUrl)

  return (
    <ChakraModal isOpen={isOpen} onClose={handleClose} {...rest}>
      <ModalOverlay />
      <ModalContent>
        {children({
          onClose: handleClose,
        })}
      </ModalContent>
    </ChakraModal>
  )
}

export const QueryStringModal: FunctionComponent<Props> = props => (
  <Suspense fallback={null}>
    <Modal {...props} />
  </Suspense>
)
