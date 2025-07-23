import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/Homepage";
import About from "./pages/About";
import Esocial from "./pages/Esocial/Esocial";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Esocial" element={<Esocial />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;