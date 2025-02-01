import { atom } from "recoil";

export const memoryState = atom({
  key: "UserInfo",
  default: [] as IMemory[],
});

export interface IMemory {
  _id: string;
  description?: string;
  link?: string;
  title?: string;
  tags?: string[];
  createdAt?: string;
  type?: string;
}
