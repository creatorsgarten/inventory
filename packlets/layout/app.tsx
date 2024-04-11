import { FunctionComponent, PropsWithChildren } from "react";
import { Box, Container, HStack, Divider, Heading } from "@chakra-ui/react";

export const AppLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Box as="nav">
        <Container maxW="container.xl" height={16}>
          <HStack h="100%" spacing={8}>
            <Box
              display={{
                base: "none",
                md: "block",
              }}
            >
              <Heading size={"md"}>Inventory</Heading>
            </Box>
          </HStack>
        </Container>
        <Divider orientation="horizontal" />
      </Box>
      <Box mt={8} pb={8}>
        {children}
      </Box>
    </>
  );
};
