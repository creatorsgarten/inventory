import { useStore } from "@nanostores/react";
import { Button } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

import { backend } from "~/backend";

export const Auth = () => {
  const state = useStore(backend.$authState);

  if (state.type === "unauthenticated")
    return (
      <Button as={Link} to="/auth/login">
        Login
      </Button>
    );
  else return null;
};
