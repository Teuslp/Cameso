// frontend/src/pages/PainelAdmin/GestaoTreinamentos/FormTreinamento.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import api from '../../../api/axios'; // Usamos nosso API centralizado

const FormTreinamento = ({ onClose, onSuccess, treinamentoParaEditar }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', validadeEmMeses: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(treinamentoParaEditar);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        nome: treinamentoParaEditar.nome || '',
        descricao: treinamentoParaEditar.descricao || '',
        validadeEmMeses: treinamentoParaEditar.validadeEmMeses || '',
      });
    }
  }, [treinamentoParaEditar, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditMode ? `/api/treinamentos/${treinamentoParaEditar._id}` : '/api/treinamentos';
      const method = isEditMode ? 'put' : 'post';

      const response = await api[method](url, formData);
      
      onSuccess(response.data);
      onClose();

    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar treinamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{isEditMode ? 'Editar Treinamento' : 'Adicionar Novo Treinamento'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome do Treinamento</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="validadeEmMeses">Validade (em meses)</label>
            <input type="number" id="validadeEmMeses" name="validadeEmMeses" value={formData.validadeEmMeses} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição (Opcional)</label>
            <textarea id="descricao" name="descricao" rows="3" value={formData.descricao} onChange={handleChange}></textarea>
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Adicionar Treinamento')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTreinamento;