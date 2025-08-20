import React, { createContext, useState, useEffect } from "react";
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
import Login from "./pages/Login/Login";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PainelCliente from "./pages/PainelCliente/PainelCliente";
import PainelAdmin from "./pages/PainelAdmin/PainelAdmin";

import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Criando contexto global de autenticação
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  // Carregar usuário do localStorage quando abrir a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <ScrollToTop />
        <Navbar />

        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Esocial" element={<Esocial />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Security" element={<Security />} />
          <Route path="/Health" element={<Health />} />
          <Route path="/Trainings" element={<Trainings />} />
          <Route path="/Judicial" element={<Judicial />} />
          <Route path="/Hygiene" element={<Hygiene />} />
          <Route path="/Consulting" element={<Consulting />} />
          <Route path="/MonthlyConsulting" element={<MonthlyConsulting />} />

          {/* Rotas protegidas */}
          <Route
            path="/cliente"
            element={
              <PrivateRoute role="cliente">
                <PainelCliente />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <PainelAdmin />
              </PrivateRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
