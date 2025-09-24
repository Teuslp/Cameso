import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import FormSubConta from './FormSubConta';

const GestaoUtilizadores = () => {
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
        setError('Falha ao carregar a lista de utilizadores.');
      } finally {
        setLoading(false);
      }
    };
    fetchUtilizadores();
  }, []);

  const handleSubContaAdicionada = (novaSubConta) => {
    setUtilizadores(prev => [...prev, novaSubConta]);
  };

  if (loading) return <div>A carregar utilizadores...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {isModalOpen && (
        <FormSubConta
          onClose={() => setIsModalOpen(false)}
          onSubContaAdicionada={handleSubContaAdicionada}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestão de Utilizadores</h2>
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          + Adicionar Novo Utilizador
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Nome</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Permissões</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {utilizadores.map(user => (
            <tr key={user._id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.nome}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.permissoes.join(', ')}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                <button>Editar</button> {/* A funcionalidade de editar pode ser implementada depois */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestaoUtilizadores;