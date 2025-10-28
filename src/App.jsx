import React from "react";
import SignupPage from "./Pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import Context from "./Layout/Context";

const App = () => {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
};

export default App;
