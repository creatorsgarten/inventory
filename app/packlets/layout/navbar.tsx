import { Box, Heading, HStack } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";

import { Link } from "~/ui/Link";
import { backend } from "~/backend";
import { backendMode } from "~/backend/backendMode";

export const Navbar = () => {
  const state = useStore(backend.$authState);

  return (
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
  );
};
