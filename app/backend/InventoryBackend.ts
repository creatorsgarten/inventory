import { ReadableAtom } from "nanostores";
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
  describeInventoryItems: (options: {
    id?: string;
  }) => Promise<InventoryItem[]>;
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
