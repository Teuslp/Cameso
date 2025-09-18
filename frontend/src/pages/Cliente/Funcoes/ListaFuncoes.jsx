// frontend/src/pages/Cliente/Funcoes/ListaFuncoes.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListaFuncoes = () => {
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFuncoes = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/funcoes', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if(response.ok) setFuncoes(data);
    } catch (error) {
      console.error("Erro ao buscar funções", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncoes();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm("Tem certeza que deseja excluir esta função?")) {
      try {
        const token = localStorage.getItem('userToken');
        await fetch(`/api/funcoes/${id}`, { 
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        fetchFuncoes(); // Atualiza a lista
      } catch (error) {
        console.error("Erro ao deletar função", error);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestão de Funções e Riscos</h2>
        <Link to="/cliente/funcoes/nova">
          <button style={{ padding: '10px 15px', cursor: 'pointer' }}>+ Adicionar Nova Função</button>
        </Link>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Nome da Função</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcoes.map(funcao => (
            <tr key={funcao._id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{funcao.nome}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                <Link to={`/cliente/funcoes/editar/${funcao._id}`} style={{ marginRight: '10px' }}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(funcao._id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaFuncoes;