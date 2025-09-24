import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
    FaFileAlt, FaCalendarAlt, FaHeadset, FaUsers, FaTasks, 
    FaHeartbeat, FaCertificate, FaHome, FaSignOutAlt, 
    FaAngleDoubleLeft, FaAngleDoubleRight, FaUserCog
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./ClientePanel.css";

function ClientePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // --- LÓGICA DE PERMISSÕES ---
  // 1. Verifica se o utilizador é uma conta 'master'
  const isMasterAccount = user?.tipoConta === 'cliente_master';

  // 2. Função auxiliar para verificar se uma sub-conta tem uma permissão específica
  const hasPermission = (permission) => {
    // Se for master, tem acesso a tudo.
    if (isMasterAccount) return true;
    // Se for sub-conta, verifica se a permissão está na sua lista
    return user?.permissoes?.includes(permission);
  };
  // -----------------------------

  return (
    <div className={`cliente-panel ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <h2>Meu Painel</h2>
          <ul>
            <li className="menu-header"><span className="nav-text">Geral</span></li>
            {/* Todos os utilizadores veem a Visão Geral */}
            <li><NavLink to="/cliente" end><FaHome /> <span className="nav-text">Visão Geral</span></NavLink></li>
            
            <li className="menu-header"><span className="nav-text">Gestão</span></li>
            
            {/* --- ITENS DO MENU COM RENDERIZAÇÃO CONDICIONAL --- */}
            {hasPermission('ver_documentos') && (
              <li><NavLink to="/cliente/documentos"><FaFileAlt /> <span className="nav-text">Documentos</span></NavLink></li>
            )}
            {hasPermission('ver_colaboradores') && (
              <li><NavLink to="/cliente/colaboradores"><FaUsers /> <span className="nav-text">Colaboradores</span></NavLink></li>
            )}
            {hasPermission('ver_asos') && (
              <li><NavLink to="/cliente/asos"><FaHeartbeat /> <span className="nav-text">ASOs</span></NavLink></li>
            )}
            {hasPermission('gerir_funcoes') && (
              <li><NavLink to="/cliente/funcoes"><FaTasks /> <span className="nav-text">Funções e Riscos</span></NavLink></li>
            )}
            {hasPermission('ver_treinamentos') && (
              <li><NavLink to="/cliente/gestao-treinamentos"><FaCertificate /> <span className="nav-text">Treinamentos</span></NavLink></li>
            )}
            {isMasterAccount && (
              <li><NavLink to="/cliente/utilizadores"><FaUserCog /> <span className="nav-text">Gestão de Utilizadores</span></NavLink></li>
            )}

            <li className="menu-header"><span className="nav-text">Comunicação</span></li>
            {hasPermission('ver_agenda') && (
              <li><NavLink to="/cliente/agenda"><FaCalendarAlt /> <span className="nav-text">Agenda</span></NavLink></li>
            )}
            {hasPermission('abrir_chamado') && (
              <li><NavLink to="/cliente/chamados"><FaHeadset /> <span className="nav-text">Suporte</span></NavLink></li>
            )}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.nome.charAt(0)}</div>
            <div className="user-details">
              <span className="user-name">{user?.nome}</span>
              <span className="user-role">{isMasterAccount ? 'Gestor' : 'Utilizador'}</span>
            </div>
            <button onClick={handleLogout} className="logout-button" title="Sair">
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

