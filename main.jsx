import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import SymptomChecker from "./SymptomChecker.jsx";
import Results from "./Results.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";

import { UserProvider } from "./UserContext.jsx";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/symptom-check" element={<SymptomChecker />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
