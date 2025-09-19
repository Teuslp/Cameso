// frontend/src/pages/PainelAdmin/FormNovoCliente.jsx (NOVO ARQUIVO)

import React, { useState } from 'react';

const FormNovoCliente = ({ onClose, onClienteAdicionado }) => {
  const [formData, setFormData] = useState({
    razaoSocial: '',
    cnpj: '',
    nome: '',
    email: '',
    senha: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await fetch('/api/admin/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar cliente.');
      }
      
      onClienteAdicionado(data); // Envia o novo cliente para a lista da página principal
      onClose(); // Fecha o modal

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop"> {/* Reutiliza o estilo de modal que já temos */}
      <div className="modal-content">
        <h2>Cadastrar Novo Cliente</h2>
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
          <div className="form-group">
            <label htmlFor="senha">Senha Inicial</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Adicionando alguns estilos genéricos que podem ser colocados em um arquivo CSS compartilhado
const Styles = () => (
  <style>{`
    .modal-backdrop {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.6); display: flex;
      justify-content: center; align-items: center; z-index: 1050;
    }
    .modal-content {
      background: white; padding: 2rem; border-radius: 8px;
      width: 90%; max-width: 500px;
    }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 6px; }
    .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; }
    .error-message { color: #dc3545; text-align: center; }
  `}</style>
);
// Você pode remover o <Styles/> e colocar as classes CSS em um arquivo .css

export default FormNovoCliente;