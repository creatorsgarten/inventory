import { defer } from '@remix-run/react'
import { Button, Heading, HStack, Spacer, VStack } from '@chakra-ui/react'

import { MainContainer } from '~/packlets/layout/mainContainer'
import { Icon } from '~/packlets/commons/icon'
import { getTags } from '~/packlets/data/getTags'
import { TagsTable } from '~/packlets/tags/table'

export const clientLoader = async () => {
  return defer({
    getTags: getTags(),
  })
}

const Page = () => {
  return (
    <MainContainer>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Heading size="lg">Tags</Heading>
          <Spacer />
          <Button variant="black">
            <Icon icon="lucide:plus" mr={2} />
            Add Tag
          </Button>
        </HStack>
        <TagsTable />
      </VStack>
    </MainContainer>
  )
}

export default Page
