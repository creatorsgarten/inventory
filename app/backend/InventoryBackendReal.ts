import { Session } from "@supabase/supabase-js";
import { atom, onMount } from "nanostores";

import { Item, Tag } from "~/packlets/commons/types";
import { ofetch } from "ofetch";

import {
  AuthState,
  CreateItemPayload,
  DescribeInventoryItemsOptions,
  InventoryBackend,
} from "./InventoryBackend";
import { singletonSupabase } from "./supabase";

export class InventoryBackendReal implements InventoryBackend {
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

  async describeInventoryItems(
    options: DescribeInventoryItemsOptions
  ): Promise<Item[]> {
    return ofetch("https://creatorsgarten-inventory.deno.dev/items", {
      query: { id: options.id || undefined },
    });
  }

  async describeTags(): Promise<Tag[]> {
    return ofetch("https://creatorsgarten-inventory.deno.dev/tags");
  }

  async createItem(payload: CreateItemPayload): Promise<string> {
    throw new Error(
      "Please update the inventory in Grist: https://grist.creatorsgarten.org/rUs75kT5nc8a/Inventorygarten"
    );
  }
}
