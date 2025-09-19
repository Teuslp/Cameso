// frontend/src/pages/PainelAdmin/FormEditCliente.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';

const FormEditCliente = ({ onClose, onClienteAtualizado, clienteParaEditar }) => {
  const [formData, setFormData] = useState({
    razaoSocial: '',
    cnpj: '',
    nome: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteParaEditar) {
      setFormData({
        razaoSocial: clienteParaEditar.razaoSocial || '',
        cnpj: clienteParaEditar.cnpj || '',
        nome: clienteParaEditar.nome || '',
        email: clienteParaEditar.email || '',
      });
    }
  }, [clienteParaEditar]);

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
      const response = await fetch(`/api/admin/clientes/${clienteParaEditar._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar cliente.');
      }
      
      onClienteAtualizado(data);
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
        <h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="razaoSocial">Razão Social</label>
            <input type="text" id="razaoSocial" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ (Opcional)</label>
            <input type="text" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome do Contato Principal</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email de Acesso</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
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

export default FormEditCliente;