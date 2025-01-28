import Brain from "./icons/Brain";
import Plus from "./icons/Plus";
import Share from "./icons/Share";
import Button from "./ui/Button";

function NavBar() {
  return (
    <div className="sticky top-0 w-full bg-white py-5 pr-15 pl-10 flex justify-between items-center z-999 border-b">
      <span className="size-20 cursor-pointer">
        <Brain />
      </span>
      <div className="flex gap-7.5">
        <Button variant="secondary" text="Share Brain" startIcon={<Share />} />
        <Button text="Add Memory" startIcon={<Plus />} />
      </div>
    </div>
  );
}

export default NavBar;
