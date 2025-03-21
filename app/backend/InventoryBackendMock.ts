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
    if (!options.ids || options.ids.length === 0) {
      return items;
    }
    
    return items.filter((item) => options.ids!.includes(item.id));
  }

  async describeTags(options: DescribeTagsOptions = {}): Promise<Tag[]> {
    const tags = mockTags;
    if (!options.ids || options.ids.length === 0) {
      return tags;
    }
    
    return tags.filter((tag) => options.ids!.includes(tag.id));
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
