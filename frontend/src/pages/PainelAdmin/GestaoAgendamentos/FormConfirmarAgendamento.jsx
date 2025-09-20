// frontend/src/pages/PainelAdmin/GestaoAgendamentos/FormConfirmarAgendamento.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const FormConfirmarAgendamento = ({ onClose, onSuccess, agendamentoParaEditar }) => {
  const [formData, setFormData] = useState({
    dataConfirmada: '',
    localConfirmado: '',
    instrucoes: '',
    status: 'Solicitado'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (agendamentoParaEditar) {
      setFormData({
        dataConfirmada: agendamentoParaEditar.dataConfirmada ? new Date(agendamentoParaEditar.dataConfirmada).toISOString().split('T')[0] : '',
        localConfirmado: agendamentoParaEditar.localConfirmado || '',
        instrucoes: agendamentoParaEditar.instrucoes || '',
        status: agendamentoParaEditar.status || 'Solicitado',
      });
    }
  }, [agendamentoParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.put(`/api/admin/agendamentos/${agendamentoParaEditar._id}`, formData);
      onSuccess(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar agendamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Confirmar / Editar Agendamento</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="status">Status do Agendamento</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="Solicitado">Solicitado</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Realizado">Realizado</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dataConfirmada">Data Confirmada</label>
            <input type="date" id="dataConfirmada" name="dataConfirmada" value={formData.dataConfirmada} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="localConfirmado">Local do Exame</label>
            <input type="text" id="localConfirmado" name="localConfirmado" value={formData.localConfirmado} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="instrucoes">Instruções para o Cliente (Opcional)</label>
            <textarea id="instrucoes" name="instrucoes" rows="3" value={formData.instrucoes} onChange={handleChange}></textarea>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormConfirmarAgendamento;