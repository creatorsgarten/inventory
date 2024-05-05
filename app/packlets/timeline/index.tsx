import { FunctionComponent, PropsWithChildren } from 'react'
import { Box, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { Icon } from '~/packlets/commons/icon'
import { Log } from '~/packlets/commons/types'
import { BaseBadge } from '~/packlets/timeline/baseBadge'
import { Action, PossessionType } from '~/packlets/commons/constants'
import { Link } from '~/ui/Link'

interface Props {
  name: string
  logs: Log[]
}

export const Timeline: FunctionComponent<Props> = ({ name, logs }) => {
  return (
    <Box as="ul">
      {logs.map((log, i) => (
        <Box as="li" listStyleType="none" pb={8} position="relative" key={`activity-log-${log.id}`}>
          <Activity name={name} log={log} />
          {logs.length - 1 !== i && (
            <Box borderRight="2px" borderColor="gray.200" position="absolute" left={4} bottom={1} h={6} />
          )}
        </Box>
      ))}
    </Box>
  )
}

interface ActivityProps {
  name: string
  log: Log
}

const Activity: FunctionComponent<ActivityProps> = ({ name, log }) => {
  switch (log.action) {
    case Action.Created:
      return (
        <BaseBadge color="gray.600" icon="lucide:plus" date={dayjs(log.createdAt)}>
          {name} has been created
        </BaseBadge>
      )
    case Action.Tagged:
      return (
        <BaseBadge color="blue.500" icon="lucide:tag" date={dayjs(log.createdAt)}>
          {name} tagged with tag <Link to={`/tags/${log.target!.id}`}><InlineIcon icon="lucide:cpu" /><Span>{log.target!.id}</Span></Link>
        </BaseBadge>
      )
    case Action.Updated:
      return (
        <BaseBadge color="gray.600" icon="lucide:pencil" date={dayjs(log.createdAt)}>
          {name} metadata has been updated
        </BaseBadge>
      )
    case Action.CheckIn:
      if (log.target?.type === PossessionType.Container)
        return (
          <BaseBadge color="green.600" icon="lucide:container" date={dayjs(log.createdAt)}>
            {name} has been checked into <Link to={`/containers/${log.target!.id}`}><InlineIcon icon="lucide:container" /><Span>{log.target?.name}</Span></Link>
          </BaseBadge>
        )
      else
        return (
          <BaseBadge color="green.600" icon="lucide:user" date={dayjs(log.createdAt)}>
            {name} has been transferred to <InlineIcon icon="lucide:user" /><Span>{log.target?.name}</Span>
          </BaseBadge>
        )
    default:
      return (
        <BaseBadge color="gray.600" icon="lucide:box-select" date={dayjs(log.createdAt)}>
          Unknown action (Code: <Span>{log.action}</Span>)
        </BaseBadge>
      )
  }
}

const Span: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Text as="span" color="black" fontWeight="medium">
    {children}
  </Text>
)

const InlineIcon: FunctionComponent<{ icon: string }> = ({ icon }) => (
  <Icon icon={icon} mb={-0.5} mr={1} color="black" />
)
