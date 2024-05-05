import { Await, useLoaderData } from "@remix-run/react"
import { Table } from "@rayriffy/table"
import { Suspense } from "react"

import { clientLoader } from "~/routes/containers"
import { columns } from "~/packlets/containers/columns"
import { Spinner } from "~/packlets/layout/spinner"

export const ContainersTable = () => {
  const { getContainers } = useLoaderData<typeof clientLoader>()

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={getContainers}>
        {containers => <Table data={containers} columns={columns} />}
      </Await>
    </Suspense>
  )
}
