import { RecoilRoot } from "recoil";
import BrainPage from "./pages/BrainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BrainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* <Route path="/brain/:hash" element={<SignUpPage />} /> */}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
