import { useEffect, useState } from "react";
import NoteCard from "./ui/NoteCard";
import axios from "axios";

interface Content {
  link: string;
  title: string;
  tags: string[];
  createdAt: string;
}

function BrainSpace() {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    const fn = async () => {
      await axios.post("/api/v1/user/signin", {
        username: "varun16",
        password: "varun16",
      });
      console.log("Signin successful");
      const response = await axios.get("/api/v1/content/get");
      console.log(response.data.data);
      setContents(response.data.data);
    };
    fn()
    // const fn = async () => {

    //   console.log(a);
    // };
    // fn();

    return () => {};
  }, []);

  const onClick = async () => {};

  return (
    <div className="bg-gray-4 h-screen w-screen">
      <button onClick={onClick}>hello</button>
      <div className=" flex flex-wrap">
        {contents.map((content: Content, index) => {
          return (
            <div key={index} className="w-140">
              <NoteCard
                link={content.link}
                title={content.title}
                tags={content.tags}
                timeStamp={content.createdAt}
              />
            </div>
          );
        })}
        <div className="w-140">
          <NoteCard
            link={"https://youtu.be/vFxQyZX84Ro?si=q44RF3Q0BMjbv49k"}
            title={"Project"}
            tags={["ideas", "productivity", "project"]}
            description="hello ahscbc acjhbnb dc jwhagbSNbhcd ahSGBngcbd ahxGBNbcvN jhacvNvca "
          />
        </div>
        <div className="w-140">
          <NoteCard
            link={"https://x.com/ezeslucky/status/1883268327210119551"}
            title={"Project"}
            tags={["ideas", "productivity", "project"]}
          />
        </div>
      </div>
    </div>
  );
}

export default BrainSpace;
