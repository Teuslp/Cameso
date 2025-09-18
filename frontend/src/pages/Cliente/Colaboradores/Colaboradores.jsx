// frontend/src/pages/Cliente/Colaboradores/Colaboradores.jsx (VERSÃO FINAL COMPLETA)

import React, { useState, useEffect } from 'react';
import FormAdicionarColaborador from './FormAdicionarColaborador';
import { Link } from 'react-router-dom';

const Colaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colaboradorEmEdicao, setColaboradorEmEdicao] = useState(null);

  // Função para buscar os colaboradores da API
  const fetchColaboradores = async () => {
    try {
      // Garante que o loading seja reativado em um refetch
      setLoading(true);
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Acesso não autorizado. Faça login novamente.');
      }

      const response = await fetch('/api/colaboradores', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar dados dos colaboradores.');
      }

      const data = await response.json();
      setColaboradores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para chamar a função de busca quando o componente é montado
  useEffect(() => {
    fetchColaboradores();
  }, []);

  // Funções para controlar o modal
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

  // Funções de callback para atualizar a lista na tela sem recarregar
  const handleColaboradorAdicionado = (novoColaborador) => {
    setColaboradores(prev => [...prev, novoColaborador]);
  };

  const handleColaboradorAtualizado = (colaboradorAtualizado) => {
    setColaboradores(prev =>
      prev.map(c => (c._id === colaboradorAtualizado._id ? colaboradorAtualizado : c))
    );
  };

  // --- FUNÇÃO PARA DELETAR/DESATIVAR ---
  const handleDeleteColaborador = async (colaboradorId) => {
    if (!window.confirm("Tem certeza que deseja desativar este colaborador? Ele será removido da lista de ativos.")) {
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`/api/colaboradores/${colaboradorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao desativar o colaborador.');
      }

      setColaboradores(prevColaboradores =>
        prevColaboradores.filter(c => c._id !== colaboradorId)
      );
    } catch (err) {
      alert(err.message); // Exibe um alerta de erro simples
    }
  };

  // Renderização condicional para estados de loading e erro
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
                  {/* --- ALTERAÇÃO APLICADA AQUI --- */}
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