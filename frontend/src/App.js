import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user/Login";
import Home from "./components/dashboard/Home";
import Logout from "./components/user/Logout";
import Profile from "./components/user/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
