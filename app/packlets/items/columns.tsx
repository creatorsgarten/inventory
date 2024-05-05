import { SortableHeader } from "@rayriffy/table"
import { ColumnDef } from "@tanstack/table-core"
import { HStack, IconButton } from "@chakra-ui/react"

import { Item } from '~/packlets/commons/types'
import { Icon } from '~/packlets/commons/icon'
import { Link } from '~/ui/Link'
import { Tag } from '~/packlets/table/tag'
import { Possession } from '~/packlets/table/possession'

export const columns: ColumnDef<Item>[] = [
  {
    id: "Name",
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
    cell: ({ row }) => (
      <HStack>
        <Link to={"/items/" + row.original.id} color="black" fontWeight="semibold">{row.original.name}</Link>
      </HStack>
    ),
  },
  {
    id: "Description",
    accessorKey: "description",
  },
  {
    id: 'Tag',
    accessorKey: 'tag',
    cell: ({ row }) => {
      if (row.original.tagId)
        return <Tag id={row.original.tagId} />
      return null
    }
  },
  {
    id: 'Location',
    header: 'Location',
    cell: ({ row }) => <Possession {...row.original.possession} />
  },
  {
    id: 'options',
    cell: ({ row }) => (
      <HStack justify="end">
        <IconButton aria-label="See" size="sm" icon={<Icon icon="lucide:scan-line" />}></IconButton>
        <IconButton as={Link} to={"/items/" + row.original.id} aria-label="See" size="sm" icon={<Icon icon="lucide:eye" />}></IconButton>
        <IconButton aria-label="See" size="sm" colorScheme="red" icon={<Icon icon="lucide:trash" />}></IconButton>
      </HStack>
    )
  }
]
