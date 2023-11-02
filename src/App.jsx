import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Success from "./pages/Success";
import History from "./pages/History";
import Login from "./pages/Login";
import ChatAI from "./pages/ChatAI";
import { NavBar } from "./components/Component";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cek session storage saat aplikasi dimuat
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Simpan data login ke dalam session storage
    const user = {};
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <BrowserRouter>
      <main>
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/success"
            element={isLoggedIn ? <Success /> : <Navigate to="/" />}
          />
          <Route
            path="/history"
            element={isLoggedIn ? <History /> : <Navigate to="/" />}
          />
          <Route
            path="/chatai"
            element={isLoggedIn ? <ChatAI /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
