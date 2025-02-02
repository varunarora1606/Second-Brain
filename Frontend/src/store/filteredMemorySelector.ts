import { selector } from "recoil";
import { typeFilterState } from "./typeFilterState";
import { memoryState } from "./memoryState";
import { tagFilterState } from "./tagFilterState";

export const filteredMemorySelector = selector({
  key: "filteredMemory",
  get: ({ get }) => {
    const typeFilter = get(typeFilterState);
    const tagFilter = get(tagFilterState);
    let memories = get(memoryState);
    console.log("entered");
    console.log(tagFilter);
    console.log(typeFilter);

    memories = memories.map((memory) => {
      const updatedMemory = { ...memory };
      updatedMemory.hidden = false;

      if (tagFilter && !updatedMemory.tags?.includes(tagFilter)) {
        updatedMemory.hidden = true;
      }

      if (typeFilter && updatedMemory.type !== typeFilter) {
        updatedMemory.hidden = true;
      }

      return updatedMemory;
    });

    console.log(memories);

    return memories;
  },
});
