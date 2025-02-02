import Document from "./icons/Document";
import Google from "./icons/Google";
import Instagram from "./icons/Instagram";
import Trash from "./icons/Trash";
import Twitter from "./icons/Twitter";
import Youtube from "./icons/Youtube";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { IMemory, memoryState } from "../store/memoryState";
import { memo } from "react";
import CopyLink from "./ui/CopyLink";
import Embed from "./ui/Embed";
import { tagFilterState } from "../store/tagFilterState";

interface Props {
  _id: string;
  description?: string;
  link?: string;
  title?: string;
  tags?: string[];
  timeStamp?: string;
  sharedBrain?: boolean;
  type: "document" | "youtube" | "twitter" | "google" | "instagram";
}

const typeIcons = {
  document: <Document />,
  youtube: <Youtube />,
  twitter: <Twitter />,
  google: <Google />,
  instagram: <Instagram />,
};

const NoteCard = memo(function NoteCard({
  _id,
  description,
  link,
  title,
  tags,
  timeStamp,
  sharedBrain = false,
  type
}: Props) {
  const setMemory = useSetRecoilState(memoryState);
  const setTagFilter = useSetRecoilState(tagFilterState);

  // let type: Type;
  // if (link) {
  //   const site = link.split("/")[2];
  //   switch (site) {
  //     case "youtu.be":
  //       type = "youtube";
  //       break;
  //     case "x.com":
  //       type = "twitter";
  //       break;
  //     case "google.com":
  //       type = "google";
  //       break;
  //     case "instagram.com":
  //       type = "instagram";
  //       break;
  //     default:
  //       type = "document";
  //       break;
  //   }
  // } else {
  //   type = "document";
  // }

  const handleDelete = async () => {
    const response = await axios.delete(`/api/v1/content/delete/${_id}`);
    if (response.data.statusCode === 200) {
      setMemory((prev: IMemory[]) =>
        prev.filter((temp: IMemory) => temp._id != _id)
      );
    }
  };

  return (
    <div className="w-full p-7.5 border border-gray-200 rounded-xl bg-white">
      <div className="flex items-start justify-between border-b pb-4">
        <div className="flex items-center">
          <a
            href={link}
            target="_blank"
            className="size-10 text-gray-2 hover:text-gray-3 cursor-pointer mr-4"
          >
            {typeIcons[type]}
          </a>
        </div>
        <p className="font-bold text-gray-3 whitespace-wrap text-[15px]">
          {title}
        </p>
        <div className="flex mt-1 items-center gap-5">
          <CopyLink link={link} />
          {!sharedBrain && (
            <button
              className="text-gray-1 hover:text-gray-3 size-7 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash />
            </button>
          )}
        </div>
      </div>

      <div
        className={`text-lg flex flex-col ${
          type != "twitter"
            ? description
              ? "my-4 gap-5"
              : "mt-8 mb-5 gap-5"
            : description
            ? "mt-4"
            : null
        }`}
      >
        {description}
        {link && <Embed type={type} link={link} />}
      </div>

      <div className="flex flex-wrap">
        {tags?.map((tag, index) => (
          <button
            key={index}
            className="mr-3 my-1.5 px-3 py-1 rounded-lg bg-blue-3 text-blue-4 text-[11px] font-bold cursor-pointer hover:bg-blue-4 hover:text-blue-3"
            onClick={() => setTagFilter(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div>
        <p className="text-[11px] mt-1.5 font-semibold text-gray-2">
          Added on {timeStamp}
        </p>
      </div>
    </div>
  );
});

export default NoteCard;
