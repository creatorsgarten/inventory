import { ReadableAtom, atom, onMount } from "nanostores";
import { singletonSupabase } from "./supabase";

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
}

export class InventoryBackendSupabase implements InventoryBackend {
  $authState = atom<AuthState>({ type: "loading" });
  constructor(private supabase: typeof singletonSupabase) {
    onMount(this.$authState, () => {
      const {
        data: { subscription },
      } = this.supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT") {
          this.$authState.set({ type: "unauthenticated" });
        } else if (session) {
          console.log("session", session);
          this.$authState.set({
            type: "authenticated",
            user: {
              uid: session.user.id,
              name:
                session.user.user_metadata.full_name ||
                session.user.email ||
                session.user.id,
            },
          });
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    });
  }
  logOut = async () => {
    await this.supabase.auth.signOut();
  };
}

export const backend: InventoryBackend =
  typeof window !== "undefined" && location.hostname !== "mock.localhost"
    ? new InventoryBackendSupabase(singletonSupabase)
    : new InventoryBackendMock();
