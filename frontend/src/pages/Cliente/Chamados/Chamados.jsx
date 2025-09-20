// frontend/src/pages/Cliente/Chamados/Chamados.jsx (VERSÃO CORRIGIDA)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import FormAbrirChamado from './FormAbrirChamado'; 

const Chamados = () => {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchChamados = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/chamados', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Falha ao buscar chamados.');
      const data = await response.json();
      setChamados(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  const handleChamadoAdicionado = () => {
    fetchChamados();
  };

  // Esta função agora será usada na tabela
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Aberto': return { backgroundColor: '#007bff', color: '#fff', padding: '4px 8px', borderRadius: '4px' };
      case 'Em Andamento': return { backgroundColor: '#ffc107', color: '#000', padding: '4px 8px', borderRadius: '4px' };
      case 'Fechado': return { backgroundColor: '#6c757d', color: '#fff', padding: '4px 8px', borderRadius: '4px' };
      default: return {};
    }
  };


  if (loading) return <div>Carregando chamados...</div>;

  return (
    <div style={{ padding: '20px' }}>
      {isModalOpen && (
        <FormAbrirChamado
          onClose={() => setIsModalOpen(false)}
          onChamadoAdicionado={handleChamadoAdicionado}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Meus Chamados de Suporte</h2>
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          + Abrir Novo Chamado
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Assunto</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Última Atualização</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(chamado => (
            <tr key={chamado._id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                {/* --- CORREÇÃO APLICADA AQUI --- */}
                <span style={getStatusStyle(chamado.status)}>{chamado.status}</span>
              </td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                {chamado.assunto}
              </td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                {new Date(chamado.updatedAt).toLocaleString('pt-BR')}
              </td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                <Link to={`/cliente/chamados/${chamado._id}`}>
                  <button>Abrir conversa</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chamados;