import React, { useState, useEffect } from 'react';
import FormAdicionarColaborador from './FormAdicionarColaborador';
import { Link } from 'react-router-dom';
import api from '../../../api/axios'; // 1. IMPORTAR A INSTÂNCIA 'api'

const Colaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colaboradorEmEdicao, setColaboradorEmEdicao] = useState(null);

  const fetchColaboradores = async () => {
    try {
      setLoading(true);
      // 2. SUBSTITUIR 'fetch' POR 'api.get'
      const response = await api.get('/colaboradores');
      setColaboradores(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao buscar dados dos colaboradores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColaboradores();
  }, []);

  const handleDeleteColaborador = async (colaboradorId) => {
    if (!window.confirm("Tem certeza que deseja desativar este colaborador?")) {
      return;
    }
    try {
      // 3. SUBSTITUIR 'fetch' POR 'api.delete'
      await api.delete(`/colaboradores/${colaboradorId}`);
      setColaboradores(prevColaboradores =>
        prevColaboradores.filter(c => c._id !== colaboradorId)
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Falha ao desativar o colaborador.');
    }
  };
  
  // O resto do seu código (funções de modal, JSX, etc.) permanece o mesmo...

  const handleOpenModalAdicionar = () => {
    setColaboradorEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenModalEditar = (colaborador) => {
    setColaboradorEmEdicao(colaborador);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setColaboradorEmEdicao(null);
  };

  const handleColaboradorAdicionado = (novoColaborador) => {
    setColaboradores(prev => [...prev, novoColaborador]);
  };

  const handleColaboradorAtualizado = (colaboradorAtualizado) => {
    setColaboradores(prev =>
      prev.map(c => (c._id === colaboradorAtualizado._id ? colaboradorAtualizado : c))
    );
  };

  if (loading) return <div>Carregando colaboradores...</div>;
  if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {isModalOpen && (
        <FormAdicionarColaborador
          onClose={handleCloseModal}
          onColaboradorAdicionado={handleColaboradorAdicionado}
          onColaboradorAtualizado={handleColaboradorAtualizado}
          colaboradorParaEditar={colaboradorEmEdicao}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestão de Colaboradores</h2>
        <button onClick={handleOpenModalAdicionar} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          + Adicionar Novo Colaborador
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', fontSize: '0.9em' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Nome Completo</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>CPF</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Função</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Data de Admissão</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.length > 0 ? (
            colaboradores.map((colaborador) => (
              <tr key={colaborador._id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <Link to={`/cliente/colaboradores/${colaborador._id}`} style={{ textDecoration: 'underline', color: '#007bff' }}>
                    {colaborador.nomeCompleto}
                  </Link>
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{colaborador.cpf}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{colaborador.funcao}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleOpenModalEditar(colaborador)}>Editar</button>
                  <button onClick={() => handleDeleteColaborador(colaborador._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>
                Nenhum colaborador cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Colaboradores;