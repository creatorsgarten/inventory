import {
  Button,
  Container,
  HStack,
  Heading,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { defer, useNavigate } from '@remix-run/react'

import { Icon } from '~/packlets/commons/icon'
import { useGetCurrentUrlWithQueryString } from '~/packlets/commons/useGetCurrentUrlWithQueryString'
import { AddContainerModal } from '~/packlets/containers/addContainerModal'
import { ContainersQueryStringKeys } from '~/packlets/containers/constants'
import { ContainersTable } from '~/packlets/containers/table'
import { getContainers } from '~/packlets/data/getContainers'
import { MainContainer } from '~/packlets/layout/mainContainer'
import { TagsQueryStringKeys } from '~/packlets/tags/constants'

export const clientLoader = async () => {
  return defer({
    getContainers: getContainers(),
  })
}

const Page = () => {
  const navigate = useNavigate()
  const addContainerModalUrl = useGetCurrentUrlWithQueryString({
    [ContainersQueryStringKeys.AddModal]: true,
  })

  return (
    <MainContainer>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Heading size="lg">Containers</Heading>
          <Spacer />
          <Button
            variant="black"
            onClick={() => navigate(addContainerModalUrl)}
          >
            <Icon icon="lucide:plus" mr={2} />
            Add Container
          </Button>
        </HStack>
        <ContainersTable />
      </VStack>
      <AddContainerModal />
    </MainContainer>
  )
}

export default Page
