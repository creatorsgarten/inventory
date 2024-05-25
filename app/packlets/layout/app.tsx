import { FunctionComponent, PropsWithChildren } from "react"
import { Box } from "@chakra-ui/react"

import { Navbar } from "~/packlets/layout/navbar"
import { Internal } from "~/packlets/layout/internal"

export const AppLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Internal />
      <Navbar />
      <Box mt={8} pb={8}>
        {children}
      </Box>
    </>
  )
}
