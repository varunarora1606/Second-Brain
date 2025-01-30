import NoteCard from "./ui/NoteCard";
import { Masonry } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { memoryState } from "../store/memoryState";

interface Content {
  _id: string;
  link: string;
  title: string;
  tags: string[];
  createdAt: string;
}

function BrainSpace() {
  const contents = useRecoilValue(memoryState);

  return (
    <div className="bg-gray-4 pl-15 pr-11 py-8 h-full min-h-screen">
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        {console.log(contents)}
        {contents.map((content: Content) => (
          <div key={content._id}>
            <NoteCard
              _id={content._id}
              link={content.link}
              title={content.title}
              tags={content.tags}
              timeStamp={content.createdAt}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default BrainSpace;
