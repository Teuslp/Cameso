// frontend/src/pages/PainelAdmin/GestaoAgendamentos/GestaoAgendamentos.jsx (VERSÃO ATUALIZADA)

import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import './GestaoAgendamentos.css';
import FormConfirmarAgendamento from './FormConfirmarAgendamento'; // 1. IMPORTA O FORMULÁRIO

const GestaoAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. ADICIONA OS ESTADOS PARA CONTROLAR O MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState(null);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get('/admin/agendamentos');
        setAgendamentos(response.data);
      } catch (err) {
        setError('Falha ao buscar agendamentos.');
      } finally {
        setLoading(false);
      }
    };
    fetchAgendamentos();
  }, []);

  // 3. ADICIONA AS FUNÇÕES PARA ABRIR O MODAL E ATUALIZAR A LISTA
  const handleOpenModal = (agendamento) => {
    setAgendamentoEmEdicao(agendamento);
    setIsModalOpen(true);
  };

  const handleSuccess = (agendamentoAtualizado) => {
    setAgendamentos(prev => prev.map(ag => ag._id === agendamentoAtualizado._id ? agendamentoAtualizado : ag));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Solicitado': return { backgroundColor: '#ffc107', color: '#000' };
      case 'Confirmado': return { backgroundColor: '#28a745', color: '#fff' };
      case 'Cancelado': return { backgroundColor: '#dc3545', color: '#fff' };
      case 'Realizado': return { backgroundColor: '#6c757d', color: '#fff' };
      default: return {};
    }
  };

  if (loading) return <div className="admin-container">Carregando...</div>;
  if (error) return <div className="admin-container error-message">Erro: {error}</div>;

  return (
    <div className="admin-container">
      {/* 4. RENDERIZA O MODAL QUANDO ESTIVER ABERTO */}
      {isModalOpen && (
        <FormConfirmarAgendamento
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
          agendamentoParaEditar={agendamentoEmEdicao}
        />
      )}

      <header className="admin-header">
        <h1>Gestão de Agendamentos</h1>
        <p>Visualize e confirme as solicitações de agendamento dos clientes.</p>
      </header>

      <div className="admin-card">
        <h2>Solicitações de Agendamento</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Cliente</th>
              <th>Colaborador</th>
              <th>Tipo de Exame</th>
              <th>Data Sugerida</th>
              <th>Data Confirmada</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map(ag => (
              <tr key={ag._id}>
                <td><span className="status-badge" style={getStatusStyle(ag.status)}>{ag.status}</span></td>
                <td>{ag.clienteId?.razaoSocial || ag.clienteId?.nome}</td>
                <td>{ag.colaboradorId?.nomeCompleto}</td>
                <td>{ag.tipoExame}</td>
                <td>{new Date(ag.dataSugerida).toLocaleDateString('pt-BR')}</td>
                <td>{ag.dataConfirmada ? new Date(ag.dataConfirmada).toLocaleDateString('pt-BR') : 'Aguardando'}</td>
                <td className="actions-cell">
                  {/* 5. ADICIONA O EVENTO de onClick AO BOTÃO */}
                  <button className="action-btn edit" onClick={() => handleOpenModal(ag)}>Confirmar / Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestaoAgendamentos;