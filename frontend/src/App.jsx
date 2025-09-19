// frontend/src/App.jsx (VERSÃO ATUALIZADA COM ROTAS ANINHADAS DE ADMIN)

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

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
import DetalhesCliente from "./pages/PainelAdmin/DetalhesCliente";
import ClientePanel from "./pages/Cliente/ClientePanel"; 

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
import ListaFuncoes from "./pages/Cliente/Funcoes/ListaFuncoes";
import FormFuncao from "./pages/Cliente/Funcoes/FormFuncao";
import Perfil from "./pages/Cliente/Perfil/Perfil";


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

          {/* --- ROTAS PROTEGIDAS DO CLIENTE --- */}
          <Route path="/cliente" element={<PrivateRoute role="cliente"><ClientePanel /></PrivateRoute>}>
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
            <Route path="funcoes" element={<ListaFuncoes />} />
            <Route path="funcoes/nova" element={<FormFuncao />} />
            <Route path="funcoes/editar/:id" element={<FormFuncao />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>

          {/* --- ROTAS PROTEGIDAS DO ADMIN (COM ESTRUTURA ANINHADA) --- */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute role="admin">
                {/* O Outlet permite que as rotas filhas sejam renderizadas aqui dentro.
                    No futuro, podemos criar um componente de Layout para o admin 
                    e colocá-lo aqui, assim como o ClientePanel. */}
                <Outlet />
              </PrivateRoute>
            }
          >
            {/* Rota Padrão: /admin -> renderiza a lista de clientes */}
            <Route index element={<PainelAdmin />} />

            {/* Rota de Detalhes: /admin/clientes/:id -> renderiza os detalhes */}
            <Route path="clientes/:id" element={<DetalhesCliente />} />

            {/* Futuras páginas do admin (ex: /admin/configuracoes) entrarão aqui */}
          </Route>
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;