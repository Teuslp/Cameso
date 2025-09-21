// frontend/src/pages/PainelAdmin/GestaoTreinamentos/GestaoTreinamentos.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import FormTreinamento from './FormTreinamento';
import api from '../../../api/axios';
import './GestaoTreinamentos.css'; // O CSS que criaremos a seguir

const GestaoTreinamentos = () => {
  const [treinamentos, setTreinamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [treinamentoEmEdicao, setTreinamentoEmEdicao] = useState(null);

  const fetchTreinamentos = async () => {
    try {
      const response = await api.get('/treinamentos');
      setTreinamentos(response.data);
    } catch (err) {
      setError('Falha ao buscar treinamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreinamentos();
  }, []);

  const handleOpenCreateModal = () => {
    setTreinamentoEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (treinamento) => {
    setTreinamentoEmEdicao(treinamento);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    fetchTreinamentos(); // Simplesmente busca a lista atualizada
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este treinamento do catálogo?")) {
      try {
        await api.delete(`/api/treinamentos/${id}`);
        setTreinamentos(prev => prev.filter(t => t._id !== id));
      } catch (err) {
        setError("Falha ao excluir treinamento.");
      }
    }
  };

  if (loading) return <div className="admin-container">Carregando...</div>;
  if (error) return <div className="admin-container error-message">Erro: {error}</div>;

  return (
    <div className="admin-container">
      {isModalOpen && (
        <FormTreinamento 
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
          treinamentoParaEditar={treinamentoEmEdicao}
        />
      )}
      <header className="admin-header">
        <div>
            <h1>Gestão de Treinamentos</h1>
            <p>Adicione, edite ou remova treinamentos do catálogo de serviços.</p>
        </div>
        <button className="add-btn" onClick={handleOpenCreateModal}>+ Adicionar Treinamento</button>
      </header>
      
      <div className="admin-card">
        <h2>Catálogo de Treinamentos</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome do Treinamento</th>
              <th>Validade</th>
              <th>Descrição</th>
              <th style={{width: '200px'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {treinamentos.map(treinamento => (
              <tr key={treinamento._id}>
                <td>{treinamento.nome}</td>
                <td>{treinamento.validadeEmMeses} meses</td>
                <td>{treinamento.descricao || '--'}</td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleOpenEditModal(treinamento)}>Editar</button>
                  <button className="action-btn delete" onClick={() => handleDelete(treinamento._id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestaoTreinamentos;