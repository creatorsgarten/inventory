import { Box, Divider, Heading, HStack, Spacer } from "@chakra-ui/react";

import { Link } from "~/ui/Link";
import { MainContainer } from "~/ui/MainContainer";
import { Auth } from "~/packlets/layout/auth";

export const Navbar = () => {
  return (
    <Box as="nav">
      <MainContainer height={16}>
        <HStack h="100%" spacing={8}>
          <Box
            display={{
              base: "none",
              md: "block",
            }}
          >
            <Heading size="md">
              <Link to="/" color="inherit">
                Inventory
              </Link>
            </Heading>
          </Box>
          <Spacer />
          <Auth />
        </HStack>
      </MainContainer>
      <Divider orientation="horizontal" />
    </Box>
  );
};
