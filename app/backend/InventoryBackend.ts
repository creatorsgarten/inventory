import { ReadableAtom } from "nanostores";

export interface InventoryBackend {
  /**
   * Subscribe to me to get the current authentication state.
   */
  $authState: ReadableAtom<AuthState>;

  /**
   * Log out the current user.
   */
  logOut: () => Promise<void>;
}

export type AuthState =
  | { type: "loading" }
  | { type: "authenticated"; user: AuthUser }
  | { type: "unauthenticated" };

export interface AuthUser {
  uid: string;
  name: string;
}
