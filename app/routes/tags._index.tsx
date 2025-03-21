import { defer, useNavigate } from "@remix-run/react";
import { Button, Heading, HStack, Spacer, VStack } from "@chakra-ui/react";

import { MainContainer } from "~/packlets/layout/mainContainer";
import { Icon } from "~/packlets/commons/icon";
import { getTags } from "~/packlets/data/getTags";
import { TagsTable } from "~/packlets/tags/table";
import { useGetCurrentUrlWithQueryString } from "~/packlets/commons/useGetCurrentUrlWithQueryString";
import { ItemsQueryStringKeys } from "~/packlets/items/constants";
import { TagsQueryStringKeys } from "~/packlets/tags/constants";
import { AddTagModal } from "~/packlets/tags/addTagModal";

export const clientLoader = async () => {
  return defer({
    getTags: getTags(),
  });
};

const Page = () => {
  const navigate = useNavigate();
  const addTagModalUrl = useGetCurrentUrlWithQueryString({
    [TagsQueryStringKeys.AddModal]: true,
  });

  return (
    <MainContainer>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Heading size="lg">Tags</Heading>
          <Spacer />
          <Button variant="black" onClick={() => navigate(addTagModalUrl)}>
            <Icon icon="lucide:plus" mr={2} />
            Add Tag
          </Button>
        </HStack>
        <TagsTable />
      </VStack>
      <AddTagModal />
    </MainContainer>
  );
};

export default Page;
