import { defineStyle, extendTheme } from "@chakra-ui/react"

export const chakraTheme = extendTheme({
  fonts: {
    heading:
      '"Noto Sans Thai Variable",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    body: '"Noto Sans Thai Variable",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  components: {
    Button: {
      variants: {
        black: defineStyle(() => {
          return {
            color: "white",
            bg: "gray.800",
            _hover: {
              bg: "gray.900",
              _disabled: {
                bg: "gray.700",
              },
            },
          }
        }),
      },
    },
  },
})
