import { useNavigation } from "@remix-run/react";
import NProgress from "nprogress";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { Navbar } from "~/packlets/layout/navbar";
import { Internal } from "~/packlets/layout/internal";

export const AppLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const transition = useNavigation();
  const loading = transition.state !== "idle";

  useEffect(() => {
    if (loading) {
      NProgress.start();
      return () => {
        NProgress.done();
      };
    }
  }, [loading]);

  return (
    <>
      <Internal />
      <Navbar />
      <Box mt={8} pb={8}>
        {children}
      </Box>
    </>
  );
};
