import { Session } from "@supabase/supabase-js";
import { atom, onMount } from "nanostores";

import { Item, Log, Tag } from "~/packlets/commons/types";
import { ofetch } from "ofetch";
import { Action } from "~/packlets/commons/constants";

import {
  AuthState,
  CreateItemPayload,
  DescribeInventoryItemsOptions,
  DescribeTagsOptions,
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

  async describeTags(options: DescribeTagsOptions = {}): Promise<Tag[]> {
    return ofetch("https://creatorsgarten-inventory.deno.dev/tags", {
      query: { id: options.id || undefined },
    });
  }

  async createItem(payload: CreateItemPayload): Promise<string> {
    throw new Error(
      "Please update the inventory in Grist: https://grist.creatorsgarten.org/rUs75kT5nc8a/Inventorygarten"
    );
  }

  async getTagLogs(tagId: string): Promise<Log[]> {
    const logs: Log[] = [];
    const tags = await this.describeTags({ id: tagId });
    
    if (tags.length === 0) {
      return [];
    }
    
    const tag = tags[0];
    
    // Created log
    logs.push({
      id: `tag-created-${tagId}`,
      action: Action.Created,
      node: {
        id: tagId,
      },
      createdAt: tag.createdAt,
    });
    
    // Tagged log (if tag has a link)
    if (tag.link) {
      logs.push({
        id: `tag-linked-${tagId}`,
        action: Action.Tagged,
        node: {
          id: tag.link.id,
          type: tag.link.type,
        },
        target: {
          id: tagId,
        },
        createdAt: tag.updatedAt,
      });
    }
    
    // Sort logs by createdAt in reverse chronological order
    return logs.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getItemLogs(itemId: string): Promise<Log[]> {
    const logs: Log[] = [];
    const items = await this.describeInventoryItems({ id: itemId });
    
    if (items.length === 0) {
      return [];
    }
    
    const item = items[0];
    
    // Created log
    logs.push({
      id: `item-created-${itemId}`,
      action: Action.Created,
      node: {
        id: itemId,
        type: item.type,
      },
      createdAt: item.createdAt,
    });
    
    // Tagged log (if item has tags)
    if (item.tags && item.tags.length > 0) {
      for (const tagId of item.tags) {
        logs.push({
          id: `item-tagged-${itemId}-${tagId}`,
          action: Action.Tagged,
          node: {
            id: itemId,
            type: item.type,
          },
          target: {
            id: tagId,
          },
          createdAt: item.updatedAt,
        });
      }
    }
    
    // Sort logs by createdAt in reverse chronological order
    return logs.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
