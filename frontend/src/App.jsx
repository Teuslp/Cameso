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

// --- PÁGINAS DO PAINEL DO CLIENTE ---
import ClientePanel from "./pages/Cliente/ClientePanel";
import Dashboard from "./pages/Cliente/Dashboard/Dashboard";
import Documentos from "./pages/Cliente/Documentos/Documentos";
import Colaboradores from "./pages/Cliente/Colaboradores/Colaboradores";
import PerfilColaborador from "./pages/Cliente/Colaboradores/PerfilColaborador";
import Asos from "./pages/Cliente/Asos/Asos";
import ListaFuncoes from "./pages/Cliente/Funcoes/ListaFuncoes";
import FormFuncao from "./pages/Cliente/Funcoes/FormFuncao";
import Agenda from "./pages/Cliente/Agenda/Agenda";
import TreinamentosCliente from "./pages/Cliente/Treinamentos/Treinamentos"; // Renomeado para evitar conflito
import Chamados from "./pages/Cliente/Chamados/Chamados";
import DetalheChamado from "./pages/Cliente/Chamados/DetalheChamado";
import Perfil from "./pages/Cliente/Perfil/Perfil";

// --- PÁGINAS DO PAINEL DO ADMIN ---
import ListaClientes from "./pages/PainelAdmin/ListaClientes/ListaClientes";
import DetalhesCliente from "./pages/PainelAdmin/DetalhesCliente/DetalhesCliente";
import AdminLayout from "./pages/PainelAdmin/AdminLayout";
import GestaoExames from "./pages/PainelAdmin/GestaoExames/GestaoExames";
import GestaoRiscos from "./pages/PainelAdmin/GestaoRiscos/index.jsx";
import GestaoTreinamentos from "./pages/PainelAdmin/GestaoTreinamentos/GestaoTreinamentos";



function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        {/* Nova estrutura de container para o layout "sticky footer" */}
        <div className="app-container">
          <Navbar />
          <main className="app-content">
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
                <Route path="documentos" element={<Documentos />} />
                <Route path="colaboradores" element={<Colaboradores />} />
                <Route path="colaboradores/:id" element={<PerfilColaborador />} />
                <Route path="asos" element={<Asos />} />
                <Route path="funcoes" element={<ListaFuncoes />} />
                <Route path="funcoes/nova" element={<FormFuncao />} />
                <Route path="funcoes/editar/:id" element={<FormFuncao />} />
                <Route path="agenda" element={<Agenda />} />
                <Route path="gestao-treinamentos" element={<TreinamentosCliente />} />
                <Route path="chamados" element={<Chamados />} />
                <Route path="chamados/:id" element={<DetalheChamado />} />
                <Route path="perfil" element={<Perfil />} />
              </Route>

              {/* --- ROTAS PROTEGIDAS DO ADMIN --- */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute role="admin">
                    <AdminLayout /> {/* O Layout agora é o elemento principal */}
                  </PrivateRoute>
                }
              >
                <Route index element={<ListaClientes />} />
                <Route path="clientes/:id" element={<DetalhesCliente />} />
                <Route path="exames" element={<GestaoExames />} />
                <Route path="riscos" element={<GestaoRiscos />} />
                <Route path="treinamentos" element={<GestaoTreinamentos />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;