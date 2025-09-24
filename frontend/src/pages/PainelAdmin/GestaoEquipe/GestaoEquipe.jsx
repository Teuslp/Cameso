import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import FormAdminSubConta from './FormAdminSubConta';


const GestaoEquipa = () => {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUtilizadores = async () => {
      try {
        const response = await api.get('/management/sub-contas');
        setUtilizadores(response.data);
      } catch (err) {
        setError('Falha ao carregar a lista de membros da equipa.');
      } finally {
        setLoading(false);
      }
    };
    fetchUtilizadores();
  }, []);

  const handleSubContaAdicionada = (novaSubConta) => {
    setUtilizadores(prev => [...prev, novaSubConta]);
  };

  if (loading) return <div className="admin-container">A carregar equipa...</div>;
  if (error) return <div className="admin-container error-message">{error}</div>;

  return (
    <div className="admin-container">
      {isModalOpen && (
        <FormAdminSubConta
          onClose={() => setIsModalOpen(false)}
          onSubContaAdicionada={handleSubContaAdicionada}
        />
      )}
      <header className="admin-header">
        <div>
          <h1>Gestão de Equipa</h1>
          <p>Adicione e gira os membros da sua equipa administrativa.</p>
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>+ Novo Membro</button>
      </header>

      <div className="admin-card">
        <h2>Membros da Equipa</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Departamento</th>
              <th>Permissões</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {utilizadores.map(user => (
              <tr key={user._id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.departamento}</td>
                <td>{user.permissoes.join(', ')}</td>
                <td>
                  <button className="action-btn edit">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestaoEquipa;
