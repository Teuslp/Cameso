// frontend/src/pages/PainelAdmin/GestaoRiscos/index.jsx (VERSÃO COM MODAL)

import { useState } from "react";
import RiscoList from "./RiscoList";
import RiscoForm from "./RiscoForm";
import './GestaoRiscos.css';

export default function GestaoRiscos() {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 1. Novo estado para controlar o modal
  const [refreshKey, setRefreshKey] = useState(0);

  // Função para abrir o modal em modo de edição
  const handleEdit = (risco) => {
    setSelected(risco);
    setIsModalOpen(true);
  };

  // Função para abrir o modal em modo de criação
  const handleOpenCreateModal = () => {
    setSelected(null);
    setIsModalOpen(true);
  };

  // Função que será chamada pelo formulário ao salvar com sucesso
  const handleSaved = () => {
    setIsModalOpen(false); // Fecha o modal
    setSelected(null);
    setRefreshKey(prevKey => prevKey + 1); // Atualiza a lista
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1>Gestão de Riscos</h1>
          <p>Adicione, edite ou remova riscos do catálogo.</p>
        </div>
        {/* 2. Botão para adicionar um novo risco */}
        <button className="add-btn" onClick={handleOpenCreateModal}>+ Novo Risco</button>
      </header>
      
      {/* 3. O formulário agora é renderizado condicionalmente */}
      {isModalOpen && (
        <RiscoForm
          selected={selected}
          onSaved={handleSaved}
          onClose={() => setIsModalOpen(false)} // Passa a função para fechar o modal
        />
      )}

      <div className="admin-card">
        <RiscoList 
          key={refreshKey}
          onEdit={handleEdit} 
        />
      </div>
    </div>
  );
}