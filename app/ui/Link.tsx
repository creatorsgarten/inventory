import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

export interface Link extends Omit<RemixLinkProps, "color">, LinkProps {}

export function Link(props: Link) {
  return (
    <ChakraLink
      color="teal.500"
      as={ReactRouterLink}
      _hover={{ textDecoration: "none" }}
      {...props}
    />
  );
}
