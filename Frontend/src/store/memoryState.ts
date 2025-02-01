import { atom } from "recoil";

// export const memoryState = selector({
//   key: "memoryState",
//   get: async () => {
//     console.log("hello");
//     const response = await axios.get("/api/v1/content/get");
//     console.log(response.data.data);
//     return response.data.data;
//   },
// });

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
