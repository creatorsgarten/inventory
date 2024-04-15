import { Box, Divider, HStack, Heading } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { FunctionComponent, PropsWithChildren } from "react";
import { backend } from "~/backend";
import { backendMode } from "~/backend/backendMode";
import { Link } from "~/ui/Link";
import { MainContainer } from "~/ui/MainContainer";

export const AppLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const state = useStore(backend.$authState);

  return (
    <>
      <Box as="nav">
        <MainContainer height={16}>
          <HStack h="100%" spacing={8}>
            <Box
              display={{
                base: "none",
                md: "block",
              }}
            >
              <Heading size={"md"}>
                <Link to="/" color="inherit">
                  Inventory
                  {typeof window !== "undefined" &&
                  !window.location.hostname.endsWith("creatorsgarten.org")
                    ? ` (${backendMode})`
                    : null}
                </Link>
              </Heading>
            </Box>
            <span>
              {state.type}
              {state.type === "authenticated" ? ` - ${state.user.name}` : null}
            </span>
          </HStack>
        </MainContainer>
        <Divider orientation="horizontal" />
      </Box>
      <Box mt={8} pb={8}>
        {children}
      </Box>
    </>
  );
};
