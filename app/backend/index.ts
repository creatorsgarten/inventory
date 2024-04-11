import { InventoryBackend } from "./InventoryBackend";
import { InventoryBackendMock } from "./InventoryBackendMock";
import { InventoryBackendSupabase } from "./InventoryBackendSupabase";
import { singletonSupabase } from "./supabase";

export const backend: InventoryBackend =
  typeof window !== "undefined" && location.hostname !== "mock.localhost"
    ? new InventoryBackendSupabase(singletonSupabase)
    : new InventoryBackendMock();
