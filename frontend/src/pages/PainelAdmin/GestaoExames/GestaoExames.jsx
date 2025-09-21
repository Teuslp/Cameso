// frontend/src/pages/PainelAdmin/GestaoExames/GestaoExames.jsx (CORRIGIDO) ✅

import React, { useState, useEffect } from 'react';
import FormExame from './FormExame';
import './GestaoExames.css';
import api from '../../../api/axios'; // 1. IMPORTAR A INSTÂNCIA 'api'

const GestaoExames = () => {
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exameEmEdicao, setExameEmEdicao] = useState(null);

  const fetchExames = async () => {
    setLoading(true);
    try {
      // 2. USAR api.get E O CAMINHO CORRETO
      const response = await api.get('/exames');
      setExames(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExames();
  }, []);

  const handleOpenCreateModal = () => {
    setExameEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exame) => {
    setExameEmEdicao(exame);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    // Apenas recarrega a lista para garantir a consistência
    fetchExames();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este exame do catálogo?")) {
      try {
        // 3. USAR api.delete
        await api.delete(`/exames/${id}`);
        setExames(prev => prev.filter(e => e._id !== id));
      } catch (err) {
        setError("Falha ao excluir exame.");
      }
    }
  };
  
  // O resto do seu código permanece igual...
  // ...
  
  if (loading) return <div className="admin-container">Carregando...</div>;
  if (error) return <div className="admin-container error-message">Erro: {error}</div>;

  return (
    <div className="admin-container">
      {isModalOpen && (
        <FormExame 
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
          exameParaEditar={exameEmEdicao}
        />
      )}
      <header className="admin-header">
        <div>
            <h1>Gestão de Exames</h1>
            <p>Adicione, edite ou remova exames do catálogo de serviços.</p>
        </div>
        <button className="add-btn" onClick={handleOpenCreateModal}>+ Adicionar Exame</button>
      </header>
      
      <div className="admin-card">
        <h2>Catálogo de Exames</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome do Exame</th>
              <th>Descrição</th>
              <th style={{width: '200px'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {exames.map(exame => (
              <tr key={exame._id}>
                <td>{exame.nome}</td>
                <td>{exame.descricao || '--'}</td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleOpenEditModal(exame)}>Editar</button>
                  <button className="action-btn delete" onClick={() => handleDelete(exame._id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestaoExames;