import NoteCard from "./NoteCard";
import { Masonry } from "@mui/lab";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IMemory, memoryState } from "../store/memoryState";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { filteredMemorySelector } from "../store/filteredMemorySelector";

import BrainNavbar from "./BrainNavbar";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 940,
      lg: 1240,
      xl: 1700,
    },
  },
});

function BrainSpace({ sharedBrain = false }: { sharedBrain?: boolean }) {
  const { hash } = useParams();
  const navigate = useNavigate();
  const contents = useRecoilValue(filteredMemorySelector);
  const [loading, setLoading] = useState(true);
  const setContents = useSetRecoilState(memoryState);

  useEffect(() => {
    const fn = async () => {
      if (!sharedBrain) {
        axios
          .get("/api/v1/content/get")
          .then((response) => setContents(response.data.data))
          .catch(() => navigate("/signup"));
        setLoading(false);
        return;
      }
      const response = await axios.get(`/api/v1/brain/get/${hash}`);
      console.log(response.data.data.content);
      setContents(response.data.data.content);
    };
    fn();
  }, []);

  return (
    <>
      {!loading && (
        <ThemeProvider theme={theme}>
          <div className="bg-main-bg pl-11 pr-7 py-8 w-full h-full min-h-screen">
            <BrainNavbar />
            <Masonry
              columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              spacing={2}
            >
              {contents.map((content: IMemory) => (
                <>
                  {!content.hidden && (
                    <div key={content._id}>
                      <NoteCard
                        _id={content._id}
                        link={content.link}
                        title={content.title}
                        description={content.description}
                        tags={content.tags}
                        timeStamp={content.createdAt}
                        type={content.type}
                        sharedBrain={sharedBrain}
                      />
                    </div>
                  )}
                </>
              ))}
            </Masonry>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

export default BrainSpace;
