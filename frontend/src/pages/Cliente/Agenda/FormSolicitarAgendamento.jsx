// frontend/src/pages/Cliente/Agenda/FormSolicitarAgendamento.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';

const FormSolicitarAgendamento = ({ onClose, onAgendamentoAdicionado }) => {
  const [colaboradores, setColaboradores] = useState([]);
  const [formData, setFormData] = useState({
    colaboradorId: '',
    tipoExame: 'Periódico',
    dataSugerida: '',
    observacoes: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Busca a lista de colaboradores para o dropdown
    const fetchColaboradores = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/colaboradores', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if(response.ok) setColaboradores(data);
    };
    fetchColaboradores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao solicitar agendamento');
      
      onAgendamentoAdicionado(data);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modalStyle = { /* ... Estilos do modal ... */ }; // Você pode usar um CSS externo

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
        <h2>Solicitar Agendamento</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Colaborador</label>
            <select name="colaboradorId" value={formData.colaboradorId} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
              <option value="">Selecione um colaborador</option>
              {colaboradores.map(c => <option key={c._id} value={c._id}>{c.nomeCompleto}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Tipo de Exame</label>
            <select name="tipoExame" value={formData.tipoExame} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
              <option>Admissional</option>
              <option>Periódico</option>
              <option>Demissional</option>
              <option>Retorno ao Trabalho</option>
              <option>Mudança de Risco</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Data Sugerida</label>
            <input type="date" name="dataSugerida" value={formData.dataSugerida} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Observações (Opcional)</label>
            <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} style={{ width: '100%', padding: '8px' }}/>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar Solicitação'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSolicitarAgendamento;