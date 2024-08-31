import { SortableHeader } from '@rayriffy/table'
import { ColumnDef } from '@tanstack/table-core'
import { HStack, IconButton } from '@chakra-ui/react'

import { Item } from '~/packlets/commons/types'
import { Icon } from '~/packlets/commons/icon'
import { Link } from '~/packlets/commons/link'
import { Tag } from '~/packlets/table/tag'
import { Possession } from '~/packlets/table/possession'
import { RemoveItemModal } from '~/packlets/items/removeItemModal'

export const columns: ColumnDef<Item>[] = [
  {
    id: 'Name',
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
    cell: ({ row }) => (
      <HStack>
        <Link
          to={'/items/' + row.original.id}
          color="black"
          fontWeight="semibold"
        >
          {row.original.name}
        </Link>
      </HStack>
    ),
  },
  {
    id: 'Description',
    accessorKey: 'description',
  },
  {
    id: 'Tag',
    accessorKey: 'tag',
    cell: ({ row }) => {
      if (row.original.tags) return <Tag tags={row.original.tags} />
      return null
    },
  },
  {
    id: 'Location',
    header: 'Location',
    cell: ({ row }) => <Possession {...row.original.possession} />,
  },
  {
    id: 'options',
    cell: ({ row }) => (
      <HStack justify="end">
        <IconButton
          aria-label="See"
          size="sm"
          icon={<Icon icon="lucide:scan-line" />}
        ></IconButton>
        <IconButton
          as={Link}
          to={'/items/' + row.original.id}
          aria-label="See"
          size="sm"
          icon={<Icon icon="lucide:eye" />}
        ></IconButton>
        <RemoveItemModal id={row.original.id} name={row.original.name} />
      </HStack>
    ),
  },
]
