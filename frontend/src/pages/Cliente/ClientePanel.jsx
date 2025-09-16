// frontend/src/pages/Cliente/ClientePanel.jsx (VERSÃO ATUALIZADA)

import React from "react";
// 1. Importamos NavLink e Outlet do react-router-dom
import { NavLink, Outlet } from "react-router-dom"; 
import { FaFileAlt, FaCalendarAlt, FaDownload, FaUpload, FaEnvelope, FaUsers } from "react-icons/fa";
import "./ClientePanel.css";

function ClientePanel() {
  // 2. Removemos completamente o 'useState' para 'activeTab'. O router vai cuidar disso.

  return (
    <div className="cliente-panel">
      {/* Menu lateral */}
      <aside className="sidebar">
        <h2>Meu Painel</h2>
        <ul>
          {/* 3. Substituímos <li> por <NavLink>. 
              NavLink automaticamente adiciona a classe 'active' ao link que corresponde à URL atual. */}
          <li>
            <NavLink to="/cliente/documentos"><FaFileAlt /> Documentos</NavLink>
          </li>
          {/* Adicionamos nosso novo link! */}
          <li>
            <NavLink to="/cliente/colaboradores"><FaUsers /> Colaboradores</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/agenda"><FaCalendarAlt /> Agenda</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/relatorios"><FaDownload /> Relatórios</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/upload"><FaUpload /> Upload</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/mensagens"><FaEnvelope /> Mensagens</NavLink>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        {/* 4. A mágica acontece aqui. O <Outlet /> é um espaço reservado onde o 
            React Router irá renderizar o componente da rota filha correspondente. */}
        <Outlet />
      </main>
    </div>
  );
}

export default ClientePanel;