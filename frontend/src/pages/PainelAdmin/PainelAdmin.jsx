import React, { useState } from "react";
import { FaUsers, FaUserPlus, FaFileAlt, FaUpload, FaChartBar, FaComments } from "react-icons/fa";
import ChatAdmin from "./ChatAdmin";
import "./PainelAdmin.css";

function PainelAdmin() {
  const [activeTab, setActiveTab] = useState("clientes");

  return (
    <div className="admin-panel">
      {/* Menu lateral */}
      <aside className="sidebar">
        <h2>Administração</h2>
        <ul>
          <li className={activeTab === "clientes" ? "active" : ""} onClick={() => setActiveTab("clientes")}>
            <FaUsers /> ㅤGerenciar Clientes
          </li>
          <li className={activeTab === "funcionarios" ? "active" : ""} onClick={() => setActiveTab("funcionarios")}>
            <FaUserPlus /> ㅤExames
          </li>
          <li className={activeTab === "upload" ? "active" : ""} onClick={() => setActiveTab("upload")}>
            <FaUpload /> ㅤUpload Documentos
          </li>
          <li className={activeTab === "relatorios" ? "active" : ""} onClick={() => setActiveTab("relatorios")}>
            <FaChartBar /> ㅤRelatórios Internos
          </li>
          <li className={activeTab === "chat" ? "active" : ""} onClick={() => setActiveTab("chat")}>
            <FaComments /> ㅤMensagens
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        {activeTab === "clientes" && (
          <section>
            <h2>Gerenciar Clientes</h2>
            <ul>
              <li>Cliente 01 <button>Editar</button></li>
              <li>Cliente 02 <button>Editar</button></li>
            </ul>
            <button>Novo Cliente</button>
          </section>
        )}

        {activeTab === "funcionarios" && (
          <section>
            <h2>Cadastrar Funcionários/Exames</h2>
            <input type="text" placeholder="Nome do Funcionário" />
            <input type="text" placeholder="Exame" />
            <button>Adicionar</button>
          </section>
        )}

        {activeTab === "upload" && (
          <section>
            <h2>Upload de Documentos</h2>
            <input type="file" />
            <button>Enviar</button>
          </section>
        )}

        {activeTab === "relatorios" && (
          <section>
            <h2>Relatórios Internos</h2>
            <ul>
              <li>Relatório Mensal 01</li>
              <li>Relatório Mensal 02</li>
            </ul>
          </section>
        )}

        {activeTab === "chat" && (
          <section className="chat-section">
            <ChatAdmin />
          </section>
        )}
      </main>
    </div>
  );
}

export default PainelAdmin;
