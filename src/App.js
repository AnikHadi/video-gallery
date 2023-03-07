import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Component/Footer/Footer";

import Navbar from "./Component/Navbar/Navbar";
import HomePage from "./Component/pages/HomePage/HomePage";
import VideoPage from "./Component/pages/VideoPage/VideoPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/video/:VideoId" element={<VideoPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
