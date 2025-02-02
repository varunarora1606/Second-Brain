import { Tweet } from "react-tweet";

function Embed({ type, link }: { type: string; link: string | undefined }) {
  const last = link?.split("/").pop() || "";

  return (
    <>
      {type == "youtube" && (
        <iframe
          className="rounded-2xl aspect-video"
          src={link?.replace("youtu.be", "youtube.com/embed")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
      {type == "twitter" && (
        <div className="light">
          <Tweet id={last} />
        </div>
      )}
    </>
  );
}

export default Embed;
