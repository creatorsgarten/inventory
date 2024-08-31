import { SortableHeader } from '@rayriffy/table'
import { ColumnDef } from '@tanstack/table-core'
import { HStack, IconButton } from '@chakra-ui/react'

import { Container } from '~/packlets/commons/types'
import { Icon } from '~/packlets/commons/icon'
import { Link } from '~/packlets/commons/link'
import { Tag } from '~/packlets/table/tag'

export const columns: ColumnDef<Container>[] = [
  {
    id: 'Name',
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
    cell: ({ row }) => (
      <HStack>
        <Link
          to={'/containers/' + row.original.id}
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
    id: 'Items',
    header: ({ column }) => (
      <SortableHeader column={column}>Items</SortableHeader>
    ),
    accessorKey: 'items',
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
          to={'/containers/' + row.original.id}
          aria-label="See"
          size="sm"
          icon={<Icon icon="lucide:eye" />}
        ></IconButton>
        <IconButton
          aria-label="See"
          size="sm"
          colorScheme="red"
          icon={<Icon icon="lucide:trash" />}
        ></IconButton>
      </HStack>
    ),
  },
]
