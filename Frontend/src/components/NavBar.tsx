import { useSetRecoilState } from "recoil";
import Brain from "./icons/Brain";
import Plus from "./icons/Plus";
import Share from "./icons/Share";
import Button from "./ui/Button";
import { modalOpenState } from "../store/modalOpenState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NavBar({ sharedBrain = false }: { sharedBrain?: boolean }) {
  const setOpen = useSetRecoilState(modalOpenState);
  const navigate = useNavigate()

  const handleShareBrain = async () => {
    const response = await axios.get("/api/v1/brain/share");
    navigator.clipboard.writeText(
      `http://localhost:5173/brain/${response.data.data.hash}`
    );
  };

  return (
    <div className="sticky top-0 w-full bg-card-bg py-5 pr-15 pl-10 flex justify-between items-center z-999">
      <button className="size-20 cursor-pointer" onClick={() => navigate("/")}>
        <Brain />
      </button>
      <div className="flex gap-7.5 min-w-1 min-h-1">
        {!sharedBrain && <Button
          variant="secondary"
          text="Share Brain"
          onClick={handleShareBrain}
          startIcon={<Share />}
        />}
        {!sharedBrain && <Button
          onClick={() => setOpen(true)}
          text="Add Memory"
          startIcon={<Plus />}
        />}
      </div>
    </div>
  );
}

export default NavBar;
