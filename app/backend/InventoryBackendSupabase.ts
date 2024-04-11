import { atom, onMount } from "nanostores";
import { AuthState, InventoryBackend } from "./InventoryBackend";
import { singletonSupabase } from "./supabase";

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
