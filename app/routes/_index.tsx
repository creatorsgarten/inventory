import { defer } from "@remix-run/react"
import { Button, Heading, HStack, Spacer, VStack } from "@chakra-ui/react"

import { ItemsTable } from "~/packlets/items/table"
import { MainContainer } from "~/packlets/layout/mainContainer"
import { Icon } from '~/packlets/commons/icon'
import { getItems } from '~/packlets/data/getItems'

export const clientLoader = async () => {
  return defer({
    getItems: getItems(),
  })
}

const Page = () => {
  return (
    <MainContainer>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Heading size="lg">Items</Heading>
          <Spacer />
          <Button variant="black">
            <Icon icon="lucide:plus" mr={2} />
            Add Item
          </Button>
        </HStack>
        <ItemsTable />
      </VStack>
    </MainContainer>
  )
}

export default Page
