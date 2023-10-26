import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import History from "./pages/History";
import Login from "./pages/Login";
import ChatAI from "./pages/ChatAI";
// import { NavBar } from "./components/Component";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/history" element={<History />} />
          <Route path="/chatai" element={<ChatAI />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
