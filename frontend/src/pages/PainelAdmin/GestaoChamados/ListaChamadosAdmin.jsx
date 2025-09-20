// frontend/src/pages/PainelAdmin/GestaoChamados/ListaChamadosAdmin.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios';
import '../AdminLayout.css'; // Reutiliza o CSS principal

const ListaChamadosAdmin = () => {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await api.get('/api/admin/chamados');
        setChamados(response.data);
      } catch (err) {
        setError('Falha ao buscar chamados de suporte.');
      } finally {
        setLoading(false);
      }
    };
    fetchChamados();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Aberto': return { backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem' };
      case 'Em Andamento': return { backgroundColor: '#ffc107', color: '#000', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem' };
      case 'Fechado': return { backgroundColor: '#6c757d', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem' };
      default: return {};
    }
  };

  if (loading) return <div className="admin-container">Carregando chamados...</div>;
  if (error) return <div className="admin-container error-message">Erro: {error}</div>;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Central de Suporte</h1>
        <p>Visualize e gerencie todos os chamados dos clientes.</p>
      </header>
      <div className="admin-card">
        <h2>Todos os Chamados</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Cliente</th>
              <th>Assunto</th>
              <th>Última Atualização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map(chamado => (
              <tr key={chamado._id}>
                <td><span style={getStatusStyle(chamado.status)}>{chamado.status}</span></td>
                <td>{chamado.clienteId?.razaoSocial || chamado.clienteId?.nome || 'Cliente não identificado'}</td>
                <td>{chamado.assunto}</td>
                <td>{new Date(chamado.updatedAt).toLocaleString('pt-BR')}</td>
                <td>
                  <Link to={`/admin/chamados/${chamado._id}`} className="action-btn details">
                    Ver / Responder
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaChamadosAdmin;