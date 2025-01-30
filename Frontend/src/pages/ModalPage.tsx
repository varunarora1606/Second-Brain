import {
  Button,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { FormEvent, useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IMemory, memoryState } from "../store/memoryState";
import { modalOpenState } from "../store/modalOpenState";
// import Link from "../components/icons/Link";

function ModalPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const setMemory = useSetRecoilState(memoryState);
  const [open, setOpen] = useRecoilState(modalOpenState);

  useEffect(() => {
    console.log("useefect wala", titleRef);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleRef.current?.value && !urlRef.current?.value) {
      setOpen(false);
      return;
    }
    const content = await axios.post("/api/v1/content/add", {
      title: titleRef.current?.value,
      link: urlRef.current?.value,
    });
    // console.log(content);
    setMemory((prev: IMemory[]) => [...prev, content.data.data]);
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle className="pb-2">Create new Memory</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <input type="text" ref={titleRef} placeholder="Title" />
            <input type="text" placeholder="Description" disabled />
            <input type="text" ref={urlRef} placeholder="Url" />
            <Button type="submit">Submit</Button>

            {/* <div>
                <FormLabel>Tags</FormLabel>
                <Autocomplete
                  multiple
                  id="tags-default"
                  placeholder="Tags"
                  options={tags}
                  getOptionLabel={(tag) => tag}
                />
              </div> */}
            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default ModalPage;
