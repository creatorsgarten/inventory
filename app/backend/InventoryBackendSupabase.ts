import { Session } from "@supabase/supabase-js";
import { atom, onMount } from "nanostores";
import { AuthState, InventoryBackend, InventoryItem } from "./InventoryBackend";
import { singletonSupabase } from "./supabase";

export class InventoryBackendSupabase implements InventoryBackend {
  $authState = atom<AuthState>({ type: "loading" });
  constructor(private supabase: typeof singletonSupabase) {
    onMount(this.$authState, () => {
      const updateSession = (session: Session | null) => {
        this.$authState.set(
          session
            ? {
                type: "authenticated",
                user: {
                  uid: session.user.id,
                  name:
                    session.user.user_metadata.full_name ||
                    session.user.email ||
                    session.user.id,
                },
              }
            : { type: "unauthenticated" }
        );
      };
      const {
        data: { subscription },
      } = this.supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT") {
          updateSession(null);
        } else if (session) {
          updateSession(session);
        }
      });
      supabase.auth.getSession().then(({ data: { session } }) => {
        updateSession(session);
      });
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  async logOut() {
    await this.supabase.auth.signOut();
  }

  async describeInventoryItems(options: { id?: string }) {
    let query = this.supabase.from("inventory_items").select("*");
    if (options.id) query = query.eq("id", options.id);
    const { data: inventoryItems } = await query.throwOnError();
    return inventoryItems as InventoryItem[];
  }
}
