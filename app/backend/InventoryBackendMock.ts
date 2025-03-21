import { atom } from "nanostores";

import { mockItems } from "~/packlets/mocks/items";
import { Item, Log, Tag } from "~/packlets/commons/types";
import { mockTags } from "~/packlets/mocks/tags";
import { mockItemLogs, mockTagLogs } from "~/packlets/mocks/logs";

import {
  AuthState,
  CreateItemPayload,
  DescribeInventoryItemsOptions,
  DescribeTagsOptions,
  InventoryBackend,
} from "./InventoryBackend";

export class InventoryBackendMock implements InventoryBackend {
  $authState = atom<AuthState>({
    type: "authenticated",
    user: {
      uid: "dummy",
      name: "Mock user",
    },
  });

  logOut = async () => {
    this.$authState.set({ type: "unauthenticated" });
  };

  async describeInventoryItems(
    options: DescribeInventoryItemsOptions
  ): Promise<Item[]> {
    const items = mockItems;
    return options.id ? items.filter((item) => item.id === options.id) : items;
  }

  async describeTags(options: DescribeTagsOptions = {}): Promise<Tag[]> {
    const tags = mockTags;
    return options.id ? tags.filter((tag) => tag.id === options.id) : tags;
  }

  async createItem(_payload: CreateItemPayload): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newItemId = crypto.randomUUID();
    return newItemId;
  }

  async getTagLogs(tagId: string): Promise<Log[]> {
    return mockTagLogs.filter(log => 
      log.node.id === tagId || 
      (log.target && log.target.id === tagId)
    );
  }

  async getItemLogs(itemId: string): Promise<Log[]> {
    return mockItemLogs.filter(log => 
      log.node.id === itemId || 
      (log.target && log.target.id === itemId)
    );
  }
}
