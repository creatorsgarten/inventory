import { Dayjs } from 'dayjs'
import { FunctionComponent, PropsWithChildren } from 'react'
import { Box, HStack, Spacer, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'

interface Props extends PropsWithChildren {
  color: string
  icon: string
  date: Dayjs
}

export const BaseBadge: FunctionComponent<Props> = ({
  color,
  icon,
  date,
  children,
}) => (
  <HStack>
    <Box
      as="span"
      flexShrink={0}
      w={8}
      h={8}
      rounded="999px"
      bg={color}
      textColor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Icon icon={icon} />
    </Box>
    <Text textColor="gray.500" fontSize="sm" pl={1}>
      {children}
    </Text>
    <Spacer />
    <Text flexShrink={0} textColor="gray.500" fontSize="sm">
      {date.format('MMM DD')}
    </Text>
  </HStack>
)
