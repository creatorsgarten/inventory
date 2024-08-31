import { defer } from '@remix-run/react'
import { Button, Heading, HStack, Spacer, VStack } from '@chakra-ui/react'

import { MainContainer } from '~/packlets/layout/mainContainer'
import { Icon } from '~/packlets/commons/icon'
import { getContainers } from '~/packlets/data/getContainers'
import { ContainersTable } from '~/packlets/containers/table'

export const clientLoader = async () => {
  return defer({
    getContainers: getContainers(),
  })
}

const Page = () => {
  return (
    <MainContainer>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Heading size="lg">Containers</Heading>
          <Spacer />
          <Button variant="black">
            <Icon icon="lucide:plus" mr={2} />
            Add Container
          </Button>
        </HStack>
        <ContainersTable />
      </VStack>
    </MainContainer>
  )
}

export default Page
