import React, { useState } from "react";
import { FaFileAlt, FaCalendarAlt, FaDownload, FaUpload, FaEnvelope } from "react-icons/fa";
import "./ClientePanel.css";

// 🔹 Importando o ChatCliente
import ChatCliente from "./ChatCliente";

function ClientePanel({ token }) {
  const [activeTab, setActiveTab] = useState("documentos");

  return (
    <div className="cliente-panel">
      {/* Menu lateral */}
      <aside className="sidebar">
        <h2>Meu Painel</h2>
        <ul>
          <li className={activeTab === "documentos" ? "active" : ""} onClick={() => setActiveTab("documentos")}>
            <FaFileAlt /> Documentos
          </li>
          <li className={activeTab === "agenda" ? "active" : ""} onClick={() => setActiveTab("agenda")}>
            <FaCalendarAlt /> Agenda
          </li>
          <li className={activeTab === "relatorios" ? "active" : ""} onClick={() => setActiveTab("relatorios")}>
            <FaDownload /> Relatórios
          </li>
          <li className={activeTab === "upload" ? "active" : ""} onClick={() => setActiveTab("upload")}>
            <FaUpload /> Upload
          </li>
          <li className={activeTab === "mensagens" ? "active" : ""} onClick={() => setActiveTab("mensagens")}>
            <FaEnvelope /> Mensagens
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        {activeTab === "documentos" && (
          <section>
            <h2>Documentos Disponíveis</h2>
            <ul>
              <li>Laudo 01</li>
              <li>Relatório 02</li>
            </ul>
          </section>
        )}

        {activeTab === "agenda" && (
          <section>
            <h2>Agenda de Exames</h2>
            <ul>
              <li>Exame X - 10/09/2025</li>
              <li>Exame Y - 15/09/2025</li>
            </ul>
          </section>
        )}

        {activeTab === "relatorios" && (
          <section>
            <h2>Relatórios</h2>
            <ul>
              <li>Relatório Mensal</li>
            </ul>
          </section>
        )}

        {activeTab === "upload" && (
          <section>
            <h2>Upload de Documentos</h2>
            <input type="file" />
            <button>Enviar</button>
          </section>
        )}

        {activeTab === "mensagens" && (
          // 🔹 Renderizando o ChatCliente real
          <ChatCliente token={token} />
        )}
      </main>
    </div>
  );
}

export default ClientePanel;
