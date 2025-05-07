import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/user/log-in/login";
import Signup from "./pages/user/sign-up/signup";
import CreateChallenge from "./pages/company/CreateChallenge";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/company/create-challenge" element={<CreateChallenge />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
