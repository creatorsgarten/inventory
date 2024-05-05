import { Await, useLoaderData } from "@remix-run/react"
import { Table } from "@rayriffy/table"
import { Suspense } from "react"

import { clientLoader } from "~/routes/_index"
import { columns } from "~/packlets/items/columns"
import { Spinner } from "~/packlets/layout/spinner"

export const ItemsTable = () => {
  const { getItems } = useLoaderData<typeof clientLoader>()

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={getItems}>
        {items => <Table data={items} columns={columns} />}
      </Await>
    </Suspense>
  )
}
