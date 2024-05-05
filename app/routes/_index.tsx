import { defer } from "@remix-run/react"
import { Button, Heading, HStack, Spacer, VStack } from "@chakra-ui/react"

import { ItemListing } from "~/packlets/itemListing"

import { backend } from "~/backend"
import { MainContainer } from "~/ui/MainContainer"
import { Icon } from '~/packlets/commons/icon'

export const clientLoader = async () => {
  return defer({
    inventoryItemsPromise: backend.describeInventoryItems({}),
  })
}

export default function Index() {
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
        <ItemListing />
      </VStack>
    </MainContainer>
  )
}
