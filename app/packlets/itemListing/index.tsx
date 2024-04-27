import { Await, useLoaderData } from "@remix-run/react";
import { Table } from "@rayriffy/table";
import { Suspense } from "react";

import { clientLoader } from "~/routes/_index";
import { columns } from "~/packlets/itemListing/columns";
import { Spinner } from "~/packlets/layout/spinner";

export const ItemListing = () => {
  const { inventoryItemsPromise } = useLoaderData<typeof clientLoader>();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={inventoryItemsPromise}>
        {(inventoryItems) => <Table data={inventoryItems} columns={columns} />}
      </Await>
    </Suspense>
  );
};