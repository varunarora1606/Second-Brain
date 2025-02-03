import { DialogTitle, Modal, ModalClose, ModalDialog, Stack } from "@mui/joy";
import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IMemory, memoryState } from "../store/memoryState";
import { modalOpenState } from "../store/modalOpenState";
import Button from "./ui/Button";
import Cross from "./icons/Cross";
// import Link from "../components/icons/Link";

function ModalPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const setMemory = useSetRecoilState(memoryState);
  const [open, setOpen] = useRecoilState(modalOpenState);
  const [tags, setTags] = useState<string[]>([]);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && e.currentTarget.value) {
      if (tags.includes(e.currentTarget.value.toLowerCase().trim())) return;
      const newTag = e.currentTarget.value.toLowerCase().trim();
      setTags((prev) => [newTag, ...prev]);
      e.currentTarget.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !titleRef.current?.value &&
      !urlRef.current?.value &&
      !descriptionRef.current?.value
    ) {
      setOpen(false);
      return;
    }
    let newTags = tags;
    if (tagRef.current?.value) {
      const newTag = tagRef.current?.value?.toLowerCase().trim();
      if (newTag && newTag.length > 0 && !tags.includes(newTag)) {
        newTags = [newTag, ...newTags];
      }
    }
    const content = await axios.post("/api/v1/content/add", {
      title: titleRef.current?.value,
      link: urlRef.current?.value,
      description: descriptionRef.current?.value,
      tags: newTags,
    });
    setTags([]);
    setMemory((prev: IMemory[]) => [content.data.data, ...prev]);
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle className="pb-2">Create new Memory</DialogTitle>
        <Stack spacing={2}>
          <input
            className="py-2.5 px-6 border rounded-md shadow-xs text-gray-900 border-gray-300 focus:outline-blue-600"
            type="text"
            autoFocus
            onKeyDown={(e) => {
              if (e.key == "Enter") descriptionRef.current?.focus();
            }}
            ref={titleRef}
            placeholder="Title"
          />
          <input
            ref={descriptionRef}
            className="py-2.5 px-6 border rounded-md shadow-xs text-gray-900 border-gray-300 focus:outline-blue-600"
            type="text"
            onKeyDown={(e) => {
              if (e.key == "Enter") urlRef.current?.focus();
            }}
            placeholder="Description"
          />
          <input
            className="py-2.5 px-6 border rounded-md shadow-xs text-gray-900 border-gray-300 focus:outline-blue-600"
            type="text"
            ref={urlRef}
            onKeyDown={(e) => {
              if (e.key == "Enter") tagRef.current?.focus();
            }}
            placeholder="Url"
          />
          <input
            type="text"
            ref={tagRef}
            placeholder="Tags"
            onKeyDown={handleEnter}
            className="py-2.5 px-6 border rounded-md shadow-xs text-gray-900 border-gray-300 focus:outline-blue-600"
          />
          <div className="flex flex-wrap max-h-26.5 overflow-y-auto no-scrollbar">
            {tags?.map((tag, index) => (
              <div
                key={index}
                className="mr-3 my-1.5 px-3 py-1 rounded-lg bg-blue-3 text-blue-4 text-[11px] font-bold flex items-center gap-1.5"
              >
                {tag}
                <button
                  className="h-7 w-7 cursor-pointer hover:bg-blue-4 hover:text-blue-3 rounded-4xl"
                  onClick={() => setTags(tags.filter((temp) => temp != tag))}
                >
                  <Cross />
                </button>
              </div>
            ))}
          </div>
          <Button onClick={handleSubmit} text="Submit" />

          {/* <FormHelperText>This is a helper text.</FormHelperText> */}
        </Stack>
      </ModalDialog>
    </Modal>
  );
}

export default ModalPage;
