// frontend/src/pages/Cliente/Agenda/Agenda.jsx (VERSÃO CORRIGIDA)

import React, { useState, useEffect } from 'react';
import FormSolicitarAgendamento from './FormSolicitarAgendamento';
import api from '../../../api/axios'; // Usando nossa instância axios configurada

const Agenda = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        // --- CÓDIGO CORRIGIDO AQUI ---
        // A chamada com 'api' (axios) é mais simples.
        const response = await api.get('/api/agendamentos');
        
        // Os dados já estão em response.data, não é necessário usar .json()
        setAgendamentos(response.data);

      } catch (err) {
        // Axios trata erros de status (4xx, 5xx) automaticamente
        setError(err.response?.data?.message || 'Falha ao buscar agendamentos.');
      } finally {
        // Esta linha garante que o "loading" sempre terminará
        setLoading(false);
      }
    };
    fetchAgendamentos();
  }, []);

  const handleAgendamentoAdicionado = (novoAgendamento) => {
    setAgendamentos(prev => [novoAgendamento, ...prev]);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Solicitado': return { backgroundColor: '#ffc107', color: '#000', padding: '4px 8px', borderRadius: '4px' };
      case 'Confirmado': return { backgroundColor: '#28a745', color: '#fff', padding: '4px 8px', borderRadius: '4px' };
      case 'Cancelado': return { backgroundColor: '#dc3545', color: '#fff', padding: '4px 8px', borderRadius: '4px' };
      case 'Realizado': return { backgroundColor: '#6c757d', color: '#fff', padding: '4px 8px', borderRadius: '4px' };
      default: return {};
    }
  };

  if (loading) return <div>Carregando agendamentos...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>Erro: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {isModalOpen && (
        <FormSolicitarAgendamento
          onClose={() => setIsModalOpen(false)}
          onAgendamentoAdicionado={handleAgendamentoAdicionado}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Meus Agendamentos</h2>
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          + Solicitar Agendamento
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Colaborador</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Tipo</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Data Sugerida</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Data Confirmada</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.length > 0 ? (
            agendamentos.map(ag => (
              <tr key={ag._id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}><span style={getStatusStyle(ag.status)}>{ag.status}</span></td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ag.colaboradorId?.nomeCompleto || 'N/A'}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ag.tipoExame}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(ag.dataSugerida).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ag.dataConfirmada ? new Date(ag.dataConfirmada).toLocaleDateString('pt-BR') : 'Aguardando'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>Nenhuma solicitação de agendamento encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Agenda;