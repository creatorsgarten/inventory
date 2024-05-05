import { Await, useLoaderData } from "@remix-run/react"
import { Table } from "@rayriffy/table"
import { Suspense } from "react"

import { clientLoader } from "~/routes/tags"
import { columns } from "~/packlets/tags/columns"
import { Spinner } from "~/packlets/layout/spinner"

export const TagsTable = () => {
  const { getTags } = useLoaderData<typeof clientLoader>()

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={getTags}>
        {tags => <Table data={tags} columns={columns} />}
      </Await>
    </Suspense>
  )
}
