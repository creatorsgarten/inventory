import { SortableHeader } from "@rayriffy/table"
import { ColumnDef } from "@tanstack/table-core"
import { HStack, Text } from "@chakra-ui/react"

import { InventoryItem } from "~/backend/InventoryBackend"

export const columns: ColumnDef<InventoryItem>[] = [
  {
    id: "Name",
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
    cell: ({ row }) => (
      <HStack>
        <Text fontWeight="semibold">{row.original.name}</Text>
      </HStack>
    ),
  },
  {
    id: "Description",
    accessorKey: "description",
  },
]
