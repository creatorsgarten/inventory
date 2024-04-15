import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { backend } from "~/backend";
import { Link } from "~/ui/Link";
import { MainContainer } from "~/ui/MainContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const clientLoader = async () => {
  return defer({
    inventoryItemsPromise: backend.describeInventoryItems({}),
  });
};

function AppSpinner() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
}

export default function Index() {
  const { inventoryItemsPromise } = useLoaderData<typeof clientLoader>();
  return (
    <MainContainer>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Suspense
              fallback={
                <Tr>
                  <Td colSpan={2}>
                    <AppSpinner />
                  </Td>
                </Tr>
              }
            >
              <Await resolve={inventoryItemsPromise}>
                {(inventoryItems) => (
                  <>
                    {inventoryItems.map((item) => (
                      <Tr key={item.id}>
                        <Td>
                          <Link to={`/items/${item.id}`}>{item.name}</Link>
                        </Td>
                        <Td>{item.description}</Td>
                      </Tr>
                    ))}
                  </>
                )}
              </Await>
            </Suspense>
          </Tbody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
}
