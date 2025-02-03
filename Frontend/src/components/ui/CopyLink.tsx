import { useState } from "react";
import Link from "../icons/Link";
import DoubleTick from "../icons/DoubleTick";

function CopyLink({ link }: { link: string | undefined }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return (
    <button
      className={`${
        copied ? "text-secondary-txt" : "text-disabled-txt"
      } hover:text-secondary-txt size-7 cursor-pointer`}
      onClick={handleCopy}
    >
      {link ? copied ? <DoubleTick /> : <Link /> : <Link />}
    </button>
  );
}

export default CopyLink;
