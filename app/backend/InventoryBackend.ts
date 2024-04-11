import { ReadableAtom } from "nanostores";

export interface InventoryBackend {
  $authState: ReadableAtom<AuthState>;
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
