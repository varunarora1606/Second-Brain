import Document from "../icons/Document";
import Google from "../icons/Google";
import Instagram from "../icons/Instagram";
import Share from "../icons/Share";
import Trash from "../icons/Trash";
import Twitter from "../icons/Twitter";
import Youtube from "../icons/Youtube";

type Type = "document" | "youtube" | "twitter" | "google" | "instagram";

interface Props {
  description?: string;
  link?: string;
  title?: string;
  tags?: string[];
  timeStamp?: string;
}

const typeIcons = {
  document: <Document />,
  youtube: <Youtube />,
  twitter: <Twitter />,
  google: <Google />,
  instagram: <Instagram />,
};

function NoteCard({description, link, title, tags, timeStamp }: Props) {
  let type: Type;
  if(link) {
    const site = link.split("/")[2]
    switch (site) {
      case "youtu.be":
        type = "youtube"
        break;
      case "x.com":
        type = "twitter"
        break;
      case "google.com":
        type = "google"
        break;
      case "instagram.com":
        type = "instagram"
        break;
      default:
        type = "document"
        break;
    }
  } else {
    type = "document"
  }
  return (
    <div className="w-full p-7.5 border border-gray-2 rounded-xl bg-white">
      <div className="flex items-start justify-between">
        <div className="flex mt-1 items-center">
          <span className="size-10 text-gray-2 mr-4">{typeIcons[type]}</span>
        </div>
        <p className="font-bold text-gray-3 whitespace-wrap text-sm">{title}</p>
        <div className="flex mt-1 items-center gap-5">
          <span className="text-gray-1 hover:text-gray-3 size-7 cursor-pointer">
            <Share />
          </span>
          <span className="text-gray-1 hover:text-gray-3 size-7 cursor-pointer">
            <Trash />
          </span>
        </div>
      </div>

      <div className="my-4 text-[16px] flex flex-col gap-5">
        {description}
        {type=="youtube" && <iframe
        className="rounded-2xl"
          width="100%"
          src={link?.replace("youtu.be", "youtube.com/embed")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>}
        {type=="twitter" && <blockquote className="twitter-tweet">
          <a href={link?.replace("x.com", "twitter.com")}></a>
        </blockquote>}
      </div>

      <div className="flex flex-wrap">
        {tags?.map((tag) => (
          <span className="mr-3 my-1.5 px-3 py-1 rounded-lg bg-blue-3 text-blue-4 text-[11px] font-bold cursor-pointer">
            #{tag}
          </span>
        ))}
      </div>

      <div>
        <p className="text-[11px] mt-1.5 font-semibold text-gray-2">
          Added on {timeStamp}
        </p>
      </div>
    </div>
  );
}

export default NoteCard;
