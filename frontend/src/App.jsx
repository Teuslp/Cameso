// frontend/src/App.jsx (VERSÃO CORRIGIDA E FINAL)

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- CONTEXTO DE AUTENTICAÇÃO ---
import { AuthProvider } from "./context/AuthContext";

// --- COMPONENTES DE LAYOUT E UTILITÁRIOS ---
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// --- PÁGINAS PÚBLICAS ---
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

// --- PAINÉIS PRINCIPAIS (ROTAS PROTEGIDAS) ---
import PainelAdmin from "./pages/PainelAdmin/PainelAdmin";
import ClientePanel from "./pages/Cliente/ClientePanel"; // O layout do painel do cliente

// --- PÁGINAS DO PAINEL DO CLIENTE (ROTAS FILHAS) ---
import Dashboard from "./pages/Cliente/Dashboard/Dashboard";
import Colaboradores from "./pages/Cliente/Colaboradores/Colaboradores";
import Documentos from "./pages/Cliente/Documentos/Documentos";
import Asos from "./pages/Cliente/Asos/Asos";
import Agenda from "./pages/Cliente/Agenda/Agenda";
import Treinamentos from "./pages/Cliente/Treinamentos/Treinamentos";
import Chamados from "./pages/Cliente/Chamados/Chamados";
import DetalheChamado from "./pages/Cliente/Chamados/DetalheChamado";
import PerfilColaborador from "./pages/Cliente/Colaboradores/PerfilColaborador";


function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />

        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
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

          {/* --- ROTAS PROTEGIDAS DO CLIENTE (com rotas aninhadas) --- */}
          <Route
            path="/cliente"
            element={
              <PrivateRoute role="cliente">
                <ClientePanel />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="colaboradores" element={<Colaboradores />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="asos" element={<Asos />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="gestao-treinamentos" element={<Treinamentos />} />
            <Route path="chamados" element={<Chamados />} />
            <Route path="chamados/:id" element={<DetalheChamado />} />
            <Route path="colaboradores/:id" element={<PerfilColaborador />} />

          </Route>

          {/* --- ROTA PROTEGIDA DO ADMIN --- */}
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
    </AuthProvider>
  );
}

export default App;