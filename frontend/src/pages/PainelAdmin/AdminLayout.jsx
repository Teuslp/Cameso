// frontend/src/pages/PainelAdmin/AdminLayout.jsx (VERSÃO ATUALIZADA)

import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaUsers, FaClipboardList, FaShieldAlt, FaCertificate, FaSignOutAlt, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css'; // Usará o novo CSS

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={`admin-layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <nav className="admin-sidebar-nav">
          <h2>Painel ADM</h2>
          <ul>
            <li><NavLink to="/admin" end title="Clientes"><FaUsers /> <span className="nav-text">Clientes</span></NavLink></li>
            
            <li className="menu-header"><span className="nav-text">Catálogos</span></li>
            
            <li><NavLink to="/admin/exames" title="Exames"><FaClipboardList /> <span className="nav-text">Exames</span></NavLink></li>
            <li><NavLink to="/admin/riscos" title="Riscos"><FaShieldAlt /> <span className="nav-text">Riscos</span></NavLink></li>
            <li><NavLink to="/admin/treinamentos" title="Treinamentos"><FaCertificate /> <span className="nav-text">Treinamentos</span></NavLink></li>
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.nome.charAt(0)}</div>
            <div className="user-details">
              <span className="user-name">{user?.nome}</span>
              <span className="user-role">Administrador</span>
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

      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;