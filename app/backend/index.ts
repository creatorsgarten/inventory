import { InventoryBackend } from "./InventoryBackend";
import { InventoryBackendMock } from "./InventoryBackendMock";
import { InventoryBackendReal } from "./InventoryBackendReal";
import { InventoryBackendSupabase } from "./InventoryBackendSupabase";
import { backendMode } from "./backendMode";
import { singletonSupabase } from "./supabase";

export const backend: InventoryBackend =
  backendMode === "mock"
    ? new InventoryBackendMock()
    : backendMode === "legacy"
    ? new InventoryBackendSupabase(singletonSupabase)
    : new InventoryBackendReal(singletonSupabase);
