import {
  Card,
  CardBody,
  Heading,
  HStack,
  Container,
  Text, VStack,
} from "@chakra-ui/react"
import { Icon } from 'react-iconify-icon-wrapper'

import { MainContainer } from "~/ui/MainContainer"

const Page = () => {
  return (
    <MainContainer>
      <Heading size="lg">Check-in</Heading>
      <Container maxW="container.sm" pt={6} px={0}>
        <VStack spacing={4}>
          <Card variant="outline">
            <CardBody>
              <HStack spacing={2} mb={4}>
                <Icon icon="lucide:cpu" width={30} height={30} />
                <Heading size="md">Tap a NFC</Heading>
              </HStack>
              <Text fontSize="sm">Choose this option if you want to identify item by using NFC sensor on your phone.</Text>
            </CardBody>
          </Card>
          <Card variant="outline">
            <CardBody>
              <HStack spacing={2} mb={4}>
                <Icon icon="lucide:scan-barcode" width={30} height={30} />
                <Heading size="md">Scan QR code</Heading>
              </HStack>
              <Text fontSize="sm">Choose this option if you want to identify item by using camera to scan QR code.</Text>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </MainContainer>
  )
}

export default Page
