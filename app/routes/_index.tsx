import { defer, useNavigate } from '@remix-run/react'
import { Button, Heading, HStack, Spacer, VStack } from '@chakra-ui/react'

import { ItemsTable } from '~/packlets/items/table'
import { MainContainer } from '~/packlets/layout/mainContainer'
import { Icon } from '~/packlets/commons/icon'
import { getItems } from '~/packlets/data/getItems'
import { useGetCurrentUrlWithQueryString } from '~/packlets/commons/useGetCurrentUrlWithQueryString'
import { ItemsQueryStringKeys } from '~/packlets/items/constants'
import { AddItemModal } from '~/packlets/items/addItemModal'

export const clientLoader = async () => {
  return defer({
    getItems: getItems(),
  })
}

const Page = () => {
  const navigate = useNavigate()
  const addItemModalUrl = useGetCurrentUrlWithQueryString({
    [ItemsQueryStringKeys.AddModal]: true,
  })

  return (
    <MainContainer>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Heading size="lg">Items</Heading>
          <Spacer />
          <Button variant="black" onClick={() => navigate(addItemModalUrl)}>
            <Icon icon="lucide:plus" mr={2} />
            Add Item
          </Button>
        </HStack>
        <ItemsTable />
      </VStack>
      <AddItemModal />
    </MainContainer>
  )
}

export default Page
