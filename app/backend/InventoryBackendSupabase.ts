import { Session } from "@supabase/supabase-js";
import { atom, onMount } from "nanostores";

import { PossessionType, TagType } from "~/packlets/commons/constants";
import { Item, Tag } from "~/packlets/commons/types";

import {
  AuthState,
  CreateItemPayload,
  DescribeInventoryItemsOptions,
  InventoryBackend,
} from "./InventoryBackend";
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

  async describeInventoryItems(
    options: DescribeInventoryItemsOptions
  ): Promise<Item[]> {
    let query = this.supabase
      .from("items")
      .select("*, label_attachments(labels(*))");
    if (options.id) query = query.eq("id", options.id);
    const { data: inventoryItems } = await query.throwOnError();
    return inventoryItems!.map((row): Item => {
      let tags: string[] | undefined;
      const relatedLabels = row.label_attachments.flatMap((r) =>
        r.labels ? [r.labels] : []
      );
      if (relatedLabels.length > 0) {
        // TODO: Update tagId to be an array instead of a string
        tags = relatedLabels.map((r) => r?.id);
      }
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        notes: row.notes,
        type: TagType.Item,
        tags,
        possession: {
          // TODO: Replace this with the actual possession info
          type: PossessionType.User,
          id: "unknown",
        },
        createdAt: row.created_at,
        // TODO: Add updatedAt to the database
        updatedAt: "",
      };
    });
  }

  async describeTags(): Promise<Tag[]> {
    const query = this.supabase
      .from("labels")
      .select("*, label_attachments(items(*))");
    const { data: labels } = await query.throwOnError();
    return labels!.map((row): Tag => {
      let link: Tag["link"] = null;
      const relatedItem = row.label_attachments?.[0]?.items;
      if (relatedItem) {
        link = {
          type: TagType.Item,
          id: relatedItem.id,
        };
      }
      return {
        id: row.id,
        createdAt: row.created_at,
        // TODO: Replace this with the actual link info
        link: link,
        // TODO: Add updatedAt to the database
        updatedAt: "",
      };
    });
  }

  async createItem(payload: CreateItemPayload): Promise<string> {
    const { data } = await this.supabase
      .rpc("create_item_with_label", {
        p_name: payload.name,
        p_description: payload.description,
        p_tag: payload.tag,
      })
      .throwOnError();
    return data;
  }

  private getAuthUserId() {
    const authState = this.$authState.get();
    if (authState.type !== "authenticated") {
      throw new Error("User is not authenticated");
    }
    return authState.user.uid;
  }
}
