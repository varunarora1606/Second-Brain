import BrainSpace from "../components/BrainSpace";
import NavBar from "../components/NavBar";

function SharedBrainPage() {
  return (
    <>
      <NavBar sharedBrain={true}/>
      <BrainSpace sharedBrain={true}/>
    </>
  );
}

export default SharedBrainPage;
