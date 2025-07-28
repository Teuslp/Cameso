import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/Homepage";
import About from "./pages/About";
import Esocial from "./pages/Esocial/Esocial";
import Contact from "./pages/Contact/Contact";
import Security from "./pages/Security/Security";
import Health from "./pages/Health/Health";
import Trainings from "./pages/Trainings/Trainings";

import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (

    <Router>

      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Esocial" element={<Esocial />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Security" element={<Security />} />
        <Route path="/Health" element={<Health />} />
        <Route path="/Trainings" element={<Trainings />}/>
      </Routes>

      <Footer />
      
    </Router>
  );
}

export default App;