// frontend/src/pages/Cliente/Asos/FormRegistrarAso.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';

const FormRegistrarAso = ({ onClose, onAsoAdicionado }) => {
  const [colaboradores, setColaboradores] = useState([]);
  const [formData, setFormData] = useState({
    colaboradorId: '',
    tipoExame: 'Periódico',
    resultado: 'Apto',
    dataExame: '',
    proximoExame: ''
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
      if(response.ok) {
        setColaboradores(data);
      }
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
      const response = await fetch('/api/asos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao registrar ASO');
      
      onAsoAdicionado(data);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Estilo básico para o modal (pode ser movido para um arquivo CSS)
  const modalStyle = {
    backdrop: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    content: { background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' },
    formGroup: { marginBottom: '1rem' },
    formActions: { marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }
  };

  return (
    <div style={modalStyle.backdrop}>
      <div style={modalStyle.content}>
        <h2>Registrar Novo ASO</h2>
        <form onSubmit={handleSubmit}>
          <div style={modalStyle.formGroup}>
            <label>Colaborador</label>
            <select name="colaboradorId" value={formData.colaboradorId} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
              <option value="">Selecione um colaborador</option>
              {colaboradores.map(c => <option key={c._id} value={c._id}>{c.nomeCompleto}</option>)}
            </select>
          </div>
          <div style={modalStyle.formGroup}>
            <label>Tipo de Exame</label>
            <select name="tipoExame" value={formData.tipoExame} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
              <option>Admissional</option>
              <option>Periódico</option>
              <option>Demissional</option>
              <option>Retorno ao Trabalho</option>
              <option>Mudança de Risco</option>
            </select>
          </div>
          <div style={modalStyle.formGroup}>
            <label>Resultado</label>
            <select name="resultado" value={formData.resultado} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
              <option>Apto</option>
              <option>Inapto</option>
            </select>
          </div>
          <div style={modalStyle.formGroup}>
            <label>Data do Exame</label>
            <input type="date" name="dataExame" value={formData.dataExame} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
          </div>
          <div style={modalStyle.formGroup}>
            <label>Data do Próximo Exame (Vencimento)</label>
            <input type="date" name="proximoExame" value={formData.proximoExame} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={modalStyle.formActions}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegistrarAso;