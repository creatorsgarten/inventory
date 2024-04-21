import { atom } from "nanostores";

import {
  AuthState,
  DescribeInventoryItemsOptions,
  InventoryBackend,
} from "./InventoryBackend";

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

  describeInventoryItems = async (options: DescribeInventoryItemsOptions) => {
    const items = [
      {
        id: "d159fb7c-f2ca-44f6-88e6-cb8ddd4edb6c",
        created_at: "2024-04-15T17:07:50.514054+00:00",
        name: "HDMI cable, 10m",
        description: "Vention",
      },
      {
        id: "03d29bb4-2301-4daa-bd5d-79941e0fbc5f",
        created_at: "2024-04-15T17:04:33+00:00",
        name: 'Portable Monitor, 14"',
        description: 'Arzopa A1 Gamut Slim, 14.0" 1080p Portable Monitor',
      },
      {
        id: "9212a0c1-ed67-4ab3-8478-63421875e371",
        created_at: "2024-04-15T17:09:51.681986+00:00",
        name: "XLR cable, 6m",
        description: "KIRLIN MW-480 3M BKB HS 24AWG",
      },
    ];
    return options.id ? items.filter((item) => item.id === options.id) : items;
  };
}
