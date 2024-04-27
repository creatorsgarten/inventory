import { defer } from "@remix-run/react"
import { Heading, VStack } from "@chakra-ui/react"

import { ItemListing } from "~/packlets/itemListing"

import { backend } from "~/backend"
import { MainContainer } from "~/ui/MainContainer"

export const clientLoader = async () => {
  return defer({
    inventoryItemsPromise: backend.describeInventoryItems({}),
  })
}

export default function Index() {
  return (
    <MainContainer>
      <VStack spacing={4} align="stretch">
        <Heading size="lg">Items</Heading>
        <ItemListing />
      </VStack>
    </MainContainer>
  )
}
