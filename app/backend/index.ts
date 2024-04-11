export interface InventoryBackend {}

export class SupabaseInventoryBackend implements InventoryBackend {
  constructor() {}
}

export const backend: InventoryBackend = new SupabaseInventoryBackend();
