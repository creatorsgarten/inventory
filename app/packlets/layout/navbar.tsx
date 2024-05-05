import {
  Box,
  Button,
  IconButton,
  Divider,
  Heading,
  HStack,
  Spacer,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react"
import { Link } from "@remix-run/react"

import { Link } from "~/ui/Link"
import { MainContainer } from "~/ui/MainContainer"
import { Auth } from "~/packlets/layout/auth"
import { Icon } from "~/packlets/commons/icon"
import { menus } from "~/packlets/layout/menus"

export const Navbar = () => {
  return (
    <Box as="nav">
      <MainContainer height={16}>
        <HStack h="100%" spacing={8}>
          <Heading size="md">
            <Link to="/" color="inherit">
              Inventory
            </Link>
          </Heading>

          <Spacer />
          <HStack>
            <IconButton as={Link} to="/scan" aria-label='Scan Items' icon={<Icon icon="lucide:scan-line" />} />
            <Auth />
          </HStack>
        </HStack>
      </MainContainer>
      <Divider orientation="horizontal" />
      <MainContainer>
        <Wrap spacing={4} py={1}>
          {menus.map((menu) => (
            <WrapItem key={`dash-layout-${menu.name}`}>
              <Button
                as={Link}
                to={menu.to}
                variant="ghost"
                size="sm"
                textDecoration="none"
              >
                <HStack spacing={2}>
                  <Icon icon={menu.icon} />
                  <Text>{menu.name}</Text>
                </HStack>
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </MainContainer>
      <Divider orientation="horizontal" />
    </Box>
  )
}
