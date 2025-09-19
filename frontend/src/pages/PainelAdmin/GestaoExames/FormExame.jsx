// frontend/src/pages/PainelAdmin/GestaoExames/FormExame.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';

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
      const token = localStorage.getItem('userToken');
      const url = isEditMode ? `/api/exames/${exameParaEditar._id}` : '/api/exames';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao salvar exame.');
      
      onSuccess(data);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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