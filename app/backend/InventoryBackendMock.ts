import { atom } from "nanostores";
import { AuthState, InventoryBackend } from "./InventoryBackend";

export class InventoryBackendMock implements InventoryBackend {
  $authState = atom<AuthState>({
    type: "authenticated",
    user: {
      uid: "dummy",
      name: "Mock user",
    },
  });

  logOut = async () => {
    this.$authState.set({ type: "unauthenticated" });
  };

  describeInventoryItems = async () => {
    return [];
  };
}
