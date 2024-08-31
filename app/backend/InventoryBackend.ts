import { ReadableAtom } from "nanostores";

import { Item, Tag } from "~/packlets/commons/types";

import { Database } from "./supabaseTypes";

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
}

export interface DescribeInventoryItemsOptions {
  id?: string;
}

export interface DescribeTagsOptions {
  id?: string;
}

export type AuthState =
  | { type: "loading" }
  | { type: "authenticated"; user: AuthUser }
  | { type: "unauthenticated" };

export interface AuthUser {
  uid: string;
  name: string;
}

type TableRow<K extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][K]["Row"];

export interface InventoryItem extends TableRow<"inventory_items"> {}

export interface CreateItemPayload {
  name: string;
  description: string;
  tag: string;
}
