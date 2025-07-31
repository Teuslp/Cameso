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
import Judicial from "./pages/Judicial/Judicial";
import Hygiene from "./pages/Hygiene/Hygiene";
import Consulting from "./pages/Consulting/Consulting";
import MonthlyConsulting from "./pages/MonthlyConsulting/MonthlyConsulting";

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
        <Route path="/Judicial" element={<Judicial />} />
        <Route path="/Hygiene" element={<Hygiene />} />
        <Route path="/Consulting" element={<Consulting />} />
        <Route path="/MonthlyConsulting" element={<MonthlyConsulting />} />
      </Routes>

      <Footer />
      
    </Router>
  );
}

export default App;