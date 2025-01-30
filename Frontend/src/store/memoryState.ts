import axios from "axios";
import { atom, selector } from "recoil";

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
  default: selector({
    key: "UserInfo/Default",
    get: async () => {
      console.log("hello");
      const response = await axios.get("/api/v1/content/get");
      console.log(response.data.data);
      return response.data.data;
    },
  }),
});

export interface IMemory {
  _id: string;
  description?: string;
  link?: string;
  title?: string;
  tags?: string[];
  timeStamp?: string;
  type?: string;
}
