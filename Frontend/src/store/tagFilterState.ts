import { atom } from "recoil";

export const tagFilterState = atom<string|false>({
    key: "tagFilter",
    default: false
})