import { Container, ContainerProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export interface MainContainer extends ContainerProps {}

export const MainContainer: FunctionComponent<MainContainer> = props => {
  return (
    <Container maxW="container.xl" {...props}>
      {props.children}
    </Container>
  )
}
