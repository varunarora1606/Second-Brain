import { atom } from "recoil";

export const memoryState = atom({
  key: "memory",
  default: [] as IMemory[],
});

export interface IMemory {
  _id: string;
  description?: string;
  link?: string;
  title?: string;
  tags?: string[];
  createdAt?: string;
  type: "document" | "youtube" | "twitter" | "google" | "instagram";
  hidden?: boolean;
}
