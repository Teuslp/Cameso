// frontend/src/App.jsx (VERSÃO COMPLETA E CORRIGIDA)

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
import Colaboradores from "./pages/Cliente/Colaboradores/Colaboradores";
// ❗ ATENÇÃO: Crie os arquivos para os componentes abaixo.
import Documentos from "./pages/Cliente/Documentos/Documentos";
// import Agenda from "./pages/Cliente/Agenda/Agenda";
// import Relatorios from "./pages/Cliente/Relatorios/Relatorios";
// import Upload from "./pages/Cliente/Upload/Upload";
// import Mensagens from "./pages/Cliente/Mensagens/Mensagens";


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
            {/* Redireciona /cliente para /cliente/documentos por padrão */}
            <Route index element={<Navigate to="documentos" replace />} />

            {/* As rotas filhas serão renderizadas dentro do <Outlet /> do ClientePanel */}
            <Route path="colaboradores" element={<Colaboradores />} />

            {/* ❗ ATENÇÃO: Descomente as rotas abaixo após criar os arquivos de cada componente */}
            <Route path="documentos" element={<Documentos />} /> 
            {/* <Route path="agenda" element={<Agenda />} /> */}
            {/* <Route path="relatorios" element={<Relatorios />} /> */}
            {/* <Route path="upload" element={<Upload />} /> */}
            {/* <Route path="mensagens" element={<Mensagens />} /> */}
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