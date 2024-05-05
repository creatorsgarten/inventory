import { SortableHeader } from "@rayriffy/table"
import { ColumnDef } from "@tanstack/table-core"
import { HStack, IconButton } from "@chakra-ui/react"
import dayjs from 'dayjs'

import { Icon } from '~/packlets/commons/icon'
import { Link } from '~/ui/Link'
import { Tag } from '~/packlets/commons/types'
import { Linked } from '~/packlets/table/linked'

export const columns: ColumnDef<Tag>[] = [
  {
    id: "ID",
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column}>ID</SortableHeader>
    ),
    cell: ({ row }) => (
      <HStack>
        <Link to={"/tags/" + row.original.id} color="black" fontWeight="semibold">{row.original.id}</Link>
      </HStack>
    ),
  },
  {
    id: 'Linked',
    header: 'Linked',
    cell: ({ row }) => {
      if (row.original.link !== null)
        return <Linked {...row.original.link} />

      return null
    }
  },
  {
    id: 'Created',
    header: ({ column }) => (
      <SortableHeader column={column}>Created</SortableHeader>
    ),
    accessorKey: 'createdAt',
    accessorFn: (row) => dayjs(row.createdAt).format('DD MMM YY')
  },
  {
    id: 'options',
    cell: ({ row }) => (
      <HStack justify="end">
        <IconButton aria-label="See" size="sm" icon={<Icon icon={row.original.link ? 'lucide:unlink' : 'lucide:link'} />}></IconButton>
        <IconButton as={Link} to={"/tags/" + row.original.id} aria-label="See" size="sm" icon={<Icon icon="lucide:eye" />}></IconButton>
        <IconButton aria-label="See" size="sm" colorScheme="red" icon={<Icon icon="lucide:trash" />}></IconButton>
      </HStack>
    )
  }
]
