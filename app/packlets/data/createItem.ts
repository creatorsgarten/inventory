import { backend } from "~/backend";

export interface CreateItemPayload {
  name: string;
  description: string;
  tag: string;
}

export const createItem = async (payload: CreateItemPayload) => {
  return backend.createItem(payload);
};
