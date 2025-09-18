// frontend/src/pages/Cliente/Treinamentos/FormRegistrarTreinamento.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';

const FormRegistrarTreinamento = ({ onClose, onRegistroAdicionado }) => {
  // Estados para os dados das APIs
  const [colaboradores, setColaboradores] = useState([]);
  const [treinamentos, setTreinamentos] = useState([]);
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    colaboradorId: '',
    treinamentoId: '',
    dataRealizacao: '',
    dataValidade: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Busca os dados para preencher os dropdowns
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    
    const fetchColaboradores = async () => {
      const response = await fetch('/api/colaboradores', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if(response.ok) setColaboradores(data);
    };

    const fetchTreinamentos = async () => {
      const response = await fetch('/api/treinamentos', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if(response.ok) setTreinamentos(data);
    };

    fetchColaboradores();
    fetchTreinamentos();
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
      const response = await fetch('/api/registros-treinamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao registrar treinamento');
      
      onRegistroAdicionado(data);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
        <h2>Registrar Treinamento Concluído</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Colaborador</label>
            <select name="colaboradorId" value={formData.colaboradorId} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
              <option value="">Selecione um colaborador</option>
              {colaboradores.map(c => <option key={c._id} value={c._id}>{c.nomeCompleto}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Treinamento</label>
            <select name="treinamentoId" value={formData.treinamentoId} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
              <option value="">Selecione o treinamento</option>
              {treinamentos.map(t => <option key={t._id} value={t._id}>{t.nome}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Data de Realização</label>
            <input type="date" name="dataRealizacao" value={formData.dataRealizacao} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Data de Validade do Certificado</label>
            <input type="date" name="dataValidade" value={formData.dataValidade} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegistrarTreinamento;