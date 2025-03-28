import { InventoryBackend } from "./InventoryBackend";
import { InventoryBackendMock } from "./InventoryBackendMock";
import { InventoryBackendReal } from "./InventoryBackendReal";
import { backendMode } from "./backendMode";
import { singletonSupabase } from "./supabase";

export const backend: InventoryBackend =
  backendMode === "mock"
    ? new InventoryBackendMock()
    : new InventoryBackendReal(singletonSupabase);
