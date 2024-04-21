import { defer, useLoaderData } from "@remix-run/react";

import { ItemListing } from "~/packlets/itemListing";

import { backend } from "~/backend";
import { MainContainer } from "~/ui/MainContainer";

export const clientLoader = async () => {
  return defer({
    inventoryItemsPromise: backend.describeInventoryItems({}),
  });
};

export default function Index() {
  return (
    <MainContainer>
      <ItemListing />
    </MainContainer>
  );
}
