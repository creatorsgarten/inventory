import { Box, Container, Divider, HStack, Heading } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { FunctionComponent, PropsWithChildren } from "react";
import { backend } from "~/backend";

export const AppLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const state = useStore(backend.$authState);

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
            <span>
              {state.type}
              {state.type === "authenticated" ? ` - ${state.user.name}` : null}
            </span>
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
