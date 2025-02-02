import { useRecoilState } from "recoil";
import { tagFilterState } from "../store/tagFilterState";
import { typeFilterState } from "../store/typeFilterState";
import Cross from "./icons/Cross";

function BrainNavbar() {
  const [tagFilter, setTagFilter] = useRecoilState(tagFilterState);
  const [typeFilter, setTypeFilter] = useRecoilState(typeFilterState);

  return (
    <div className="pl-1 mb-8 flex overflow-x-auto no-scrollbar w-full justify-center gap-1.5">
      <button
        className={`${
          typeFilter == false && tagFilter == false
            ? "bg-blue-500 text-white"
            : "text-black"
        } hover:bg-blue-500 hover:text-white font-semibold py-1 px-6 cursor-pointer rounded-2xl`}
        onClick={() => {
          setTypeFilter(false);
          setTagFilter(false);
        }}
      >
        All
      </button>
      <button
        className={`${
          typeFilter == "document" ? "bg-blue-500 text-white" : "text-black"
        } hover:bg-blue-500 hover:text-white font-semibold py-1 px-6 cursor-pointer rounded-2xl`}
        onClick={() => setTypeFilter("document")}
      >
        Document
      </button>
      <button
        className={`${
          typeFilter == "youtube" ? "bg-blue-500 text-white" : "text-black"
        } hover:bg-blue-500 hover:text-white font-semibold py-1 px-6 cursor-pointer rounded-2xl`}
        onClick={() => setTypeFilter("youtube")}
      >
        Youtube
      </button>
      <button
        className={`${
          typeFilter == "twitter" ? "bg-blue-500 text-white" : "text-black"
        } hover:bg-blue-500 hover:text-white font-semibold py-1 px-6 cursor-pointer rounded-2xl`}
        onClick={() => setTypeFilter("twitter")}
      >
        Twitter
      </button>
      <button
        className={`bg-blue-500 text-white font-semibold ${
          tagFilter ? "py-1 pl-6 pr-4" : ""
        } rounded-2xl flex items-center`}
      >
        {tagFilter && (
          <>
            #{tagFilter}
            <button
              onClick={() => setTagFilter(false)}
              className={`cursor-pointer ml-3.5 my-1 size-9 flex items-center rounded-4xl hover:bg-white hover:text-blue-500`}
            >
              <Cross className="stroke-3.5"/>
            </button>
          </>
        )}
      </button>
    </div>
  );
}

export default BrainNavbar;
