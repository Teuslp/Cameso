// frontend/src/pages/Cliente/ClientePanel.jsx (VERSÃO ATUALIZADA)

import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaFileAlt, FaCalendarAlt, FaDownload, FaUpload, FaEnvelope, FaUsers, FaTasks, FaHeartbeat, FaCertificate, FaHome, FaSignOutAlt, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // Importe o useAuth
import "./ClientePanel.css";

function ClientePanel() {
  // 1. Novo estado para controlar se o menu está encolhido
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth(); // Pega usuário e função de logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    // 2. Adicionamos uma classe condicional ao container principal
    <div className={`cliente-panel ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <h2>Meu Painel</h2>
          <ul>
            {/* Item sem grupo */}
            <li><NavLink to="/cliente" end><FaHome /> <span className="nav-text">Visão Geral</span></NavLink></li>

            {/* --- TÍTULO DO GRUPO DE GESTÃO --- */}
            <li className="menu-header"><span className="nav-text">Gestão</span></li>

            <li><NavLink to="/cliente/documentos"><FaFileAlt /> <span className="nav-text">Documentos</span></NavLink></li>
            <li><NavLink to="/cliente/colaboradores"><FaUsers /> <span className="nav-text">Colaboradores</span></NavLink></li>
            <li><NavLink to="/cliente/asos"><FaHeartbeat /> <span className="nav-text">ASOs</span></NavLink></li>
            <li><NavLink to="/cliente/funcoes"><FaTasks /> <span className="nav-text">Funções e Riscos</span></NavLink></li>
            <li><NavLink to="/cliente/gestao-treinamentos"><FaCertificate /> <span className="nav-text">Treinamentos</span></NavLink></li>

            {/* --- TÍTULO DO GRUPO DE COMUNICAÇÃO --- */}
            <li className="menu-header"><span className="nav-text">Comunicação</span></li>

            <li><NavLink to="/cliente/agenda"><FaCalendarAlt /> <span className="nav-text">Agenda</span></NavLink></li>
            {/* Corrigindo a rota de Suporte para a que implementamos */}
            <li><NavLink to="/cliente/chamados"><FaEnvelope /> <span className="nav-text">Suporte</span></NavLink></li>
          </ul>
        </nav>

        {/* 3. Nova seção inferior do menu */}
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.nome.charAt(0)}</div>
            <div className="user-details">
              <span className="user-name">{user?.nome}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt />
            </button>
          </div>
          <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientePanel;