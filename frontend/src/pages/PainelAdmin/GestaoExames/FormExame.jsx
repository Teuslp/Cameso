// frontend/src/pages/PainelAdmin/GestaoExames/FormExame.jsx (CORRIGIDO) ✅

import React, { useState, useEffect } from 'react';
import api from '../../../api/axios'; // O import já estava correto!

const FormExame = ({ onClose, onSuccess, exameParaEditar }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(exameParaEditar);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        nome: exameParaEditar.nome || '',
        descricao: exameParaEditar.descricao || '',
      });
    }
  }, [exameParaEditar, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isEditMode) {
        // 1. USAR api.put para editar
        response = await api.put(`/exames/${exameParaEditar._id}`, formData);
      } else {
        // 2. USAR api.post para criar
        response = await api.post('/exames', formData);
      }
      
      onSuccess(response.data); // Envia os dados da resposta para a função de sucesso
      onClose();

    } catch (err) {
      // O erro do Axios geralmente tem uma mensagem mais útil em err.response.data.message
      setError(err.response?.data?.message || err.message || 'Erro ao salvar exame.');
    } finally {
      setLoading(false);
    }
  };
  
  // O resto do seu código permanece igual...
  // ...

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{isEditMode ? 'Editar Exame' : 'Adicionar Novo Exame'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome do Exame</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição (Opcional)</label>
            <textarea id="descricao" name="descricao" rows="3" value={formData.descricao} onChange={handleChange}></textarea>
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Adicionar Exame')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormExame;