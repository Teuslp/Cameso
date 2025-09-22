import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios'; // 1. IMPORTAR A INSTÂNCIA 'api'

const ListaFuncoes = () => {
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Adicionado estado de erro

  const fetchFuncoes = async () => {
    try {
      setLoading(true);
      // 2. SUBSTITUIR 'fetch' PELA CHAMADA PADRONIZADA COM 'api'
      const response = await api.get('/funcoes');
      setFuncoes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar funções');
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
        // 3. SUBSTITUIR 'fetch' PELA CHAMADA PADRONIZADA COM 'api'
        await api.delete(`/funcoes/${id}`);
        fetchFuncoes(); // Atualiza a lista
      } catch (err) {
        alert(err.response?.data?.message || 'Erro ao deletar função');
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>Erro: {error}</div>;

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