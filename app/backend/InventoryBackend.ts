import { ReadableAtom } from "nanostores";
import { Item, Log, Tag } from "~/packlets/commons/types";

export interface InventoryBackend {
  /**
   * Subscribe to me to get the current authentication state.
   */
  $authState: ReadableAtom<AuthState>;

  /**
   * Log out the current user.
   */
  logOut: () => Promise<void>;

  /**
   * Lists all the inventory items
   */
  describeInventoryItems: (
    options: DescribeInventoryItemsOptions
  ) => Promise<Item[]>;

  /**
   * Lists all tags
   */
  describeTags: (options: DescribeTagsOptions) => Promise<Tag[]>;

  /**
   * Creates a new item
   * @returns the id of the created item
   */
  createItem: (payload: CreateItemPayload) => Promise<string>;

  /**
   * Get logs for a specific tag
   */
  getTagLogs: (tagId: string) => Promise<Log[]>;

  /**
   * Get logs for a specific item
   */
  getItemLogs: (itemId: string) => Promise<Log[]>;
}

export interface DescribeInventoryItemsOptions {
  ids?: string[];
}

export interface DescribeTagsOptions {
  ids?: string[];
}

export type AuthState =
  | { type: "loading" }
  | { type: "authenticated"; user: AuthUser }
  | { type: "unauthenticated" };

export interface AuthUser {
  uid: string;
  name: string;
}

export interface CreateItemPayload {
  name: string;
  description: string;
  tag: string;
}
