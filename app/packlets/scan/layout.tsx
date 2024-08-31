import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'
import { Box, Container, Heading, HStack, Spacer, Text } from '@chakra-ui/react'

import { MainContainer } from '~/packlets/layout/mainContainer'

interface Props extends PropsWithChildren {
  title: string
  subtitle: string
  menu?: ReactNode
}

export const ScanLayout: FunctionComponent<Props> = ({
  title,
  subtitle,
  menu,
  children,
}) => {
  return (
    <MainContainer>
      <HStack>
        <Box>
          <Heading size="lg">{title}</Heading>
          <Text>{subtitle}</Text>
        </Box>
        <Spacer />
        {menu}
      </HStack>
      <Container maxW="container.sm" pt={8} px={0}>
        {children}
      </Container>
    </MainContainer>
  )
}
