import { Container, ContainerProps } from "@chakra-ui/react";

export interface MainContainer extends ContainerProps {}

export function MainContainer(props: MainContainer) {
  return (
    <Container maxW="container.xl" {...props}>
      {props.children}
    </Container>
  );
}
