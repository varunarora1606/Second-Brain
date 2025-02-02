import { atom } from "recoil"

export const typeFilterState = atom<string|false>({
    key: "typeFilter",
    default: false
})

