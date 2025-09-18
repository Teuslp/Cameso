import React from "react";
// 1. Importamos NavLink e Outlet do react-router-dom
import { NavLink, Outlet } from "react-router-dom";
import {
  FaFileAlt, FaCalendarAlt, FaDownload, FaUpload,
  FaEnvelope, FaUsers, FaHome, FaHeartbeat, FaCertificate
} from "react-icons/fa";

import "./ClientePanel.css";

function ClientePanel() {

  return (
    <div className="cliente-panel">
      <aside className="sidebar">
        <h2>Meu Painel</h2>
        <ul>
          <li>
            <NavLink to="/cliente" end><FaHome /> Visão Geral</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/documentos"><FaFileAlt /> Documentos</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/colaboradores"><FaUsers /> Colaboradores</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/asos"><FaHeartbeat /> ASOs</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/agenda"><FaCalendarAlt /> Agenda</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/gestao-treinamentos"><FaCertificate /> Treinamentos</NavLink>
          </li>
          <li>
            <NavLink to="/cliente/chamados"><FaEnvelope /> Suporte</NavLink>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientePanel;