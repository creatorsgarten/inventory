import { InventoryBackend } from "./InventoryBackend";
import { InventoryBackendMock } from "./InventoryBackendMock";
import { InventoryBackendSupabase } from "./InventoryBackendSupabase";
import { backendMode } from "./backendMode";
import { singletonSupabase } from "./supabase";

export const backend: InventoryBackend =
  backendMode === "mock"
    ? new InventoryBackendMock()
    : new InventoryBackendSupabase(singletonSupabase);
