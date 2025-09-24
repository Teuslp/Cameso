import React, { useState, useEffect } from 'react'; // 1. Adicionar useEffect
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; // 2. Adicionar useLocation
import {
  FaUsers, FaClipboardList, FaShieldAlt, FaCertificate,
  FaSignOutAlt, FaAngleDoubleLeft, FaAngleDoubleRight, FaHeadset, FaCalendarAlt,
  FaUsersCog
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 3. Hook para obter a localização atual

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isMasterAdmin = user?.tipoConta === 'admin_master';

  const hasPermission = (permission) => {
    if (isMasterAdmin) return true;
    return user?.permissoes?.includes(permission);
  };

  // 4. LÓGICA DE REDIRECIONAMENTO INTELIGENTE
  useEffect(() => {
    // Se não for admin master e estiver na página principal do admin (/admin)
    if (!isMasterAdmin && location.pathname === '/admin') {
      // Define a ordem de prioridade das páginas
      const possibleRedirects = [
        { permission: 'ver_todos_chamados', path: '/admin/chamados' },
        { permission: 'gerir_catalogo_exames', path: '/admin/exames' },
        { permission: 'gerir_catalogo_riscos', path: '/admin/riscos' },
        { permission: 'gerir_catalogo_treinamentos', path: '/admin/treinamentos' },
      ];

      // Encontra a primeira página a que o utilizador tem acesso
      const redirectTo = possibleRedirects.find(item => hasPermission(item.permission));

      // Se encontrar uma página permitida, redireciona
      if (redirectTo) {
        navigate(redirectTo.path, { replace: true });
      }
      // Se não, pode redirecionar para uma página de "acesso negado" ou agendamentos
      else {
        navigate('/admin/agendamentos', { replace: true });
      }
    }
  }, [user, location.pathname, navigate, isMasterAdmin]); // Executa quando o utilizador ou a rota muda

  return (
    <div className={`admin-layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <nav className="admin-sidebar-nav">
          <h2>Painel ADM</h2>
          <ul>
            {isMasterAdmin && (
              <li><NavLink to="/admin" end title="Clientes"><FaUsers /> <span className="nav-text">Clientes</span></NavLink></li>
            )}
            
            {/* --- CORREÇÃO NA LÓGICA DE EXIBIÇÃO DO CABEÇALHO --- */}
            {(hasPermission('gerir_catalogo_exames') || hasPermission('gerir_catalogo_riscos') || hasPermission('gerir_catalogo_treinamentos')) && (
              <li className="menu-header"><span className="nav-text">Catálogos</span></li>
            )}
            {hasPermission('gerir_catalogo_exames') && (
              <li><NavLink to="/admin/exames" title="Exames"><FaClipboardList /> <span className="nav-text">Exames</span></NavLink></li>
            )}
            {hasPermission('gerir_catalogo_riscos') && (
              <li><NavLink to="/admin/riscos" title="Riscos"><FaShieldAlt /> <span className="nav-text">Riscos</span></NavLink></li>
            )}
            {hasPermission('gerir_catalogo_treinamentos') && (
              <li><NavLink to="/admin/treinamentos" title="Treinamentos"><FaCertificate /> <span className="nav-text">Treinamentos</span></NavLink></li>
            )}

            <li className="menu-header"><span className="nav-text">Comunicação</span></li>
            {/* Por agora, todos os admins podem ver agendamentos */}
            <li><NavLink to="/admin/agendamentos"><FaCalendarAlt /> <span className="nav-text">Agendamentos</span></NavLink></li>
            {hasPermission('ver_todos_chamados') && (
              <li><NavLink to="/admin/chamados"><FaHeadset /> <span className="nav-text">Suporte</span></NavLink></li>
            )}
            
            {isMasterAdmin && (
                <>
                    <li className="menu-header"><span className="nav-text">Administração</span></li>
                    <li><NavLink to="/admin/equipa" title="Gestão de Equipa"><FaUsersCog /> <span className="nav-text">Gestão de Equipa</span></NavLink></li>
                </>
            )}
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.nome.charAt(0)}</div>
            <div className="user-details">
              <span className="user-name">{user?.nome}</span>
              <span className="user-role">{isMasterAdmin ? 'Super Admin' : user?.departamento}</span>
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

