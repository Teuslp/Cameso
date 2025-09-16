// frontend/src/pages/Cliente/Colaboradores/FormAdicionarColaborador.jsx (VERSÃO ATUALIZADA)

import React, { useState, useEffect } from 'react';
import './FormAdicionarColaborador.css';

// 1. O componente agora aceita uma nova propriedade: 'colaboradorParaEditar'
const FormAdicionarColaborador = ({ onClose, onColaboradorAdicionado, onColaboradorAtualizado, colaboradorParaEditar }) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '', cpf: '', funcao: '', dataAdmissao: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Determina se estamos no modo de edição
  const isEditMode = Boolean(colaboradorParaEditar);

  // 3. useEffect para preencher o formulário quando entramos no modo de edição
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        nomeCompleto: colaboradorParaEditar.nomeCompleto,
        cpf: colaboradorParaEditar.cpf,
        funcao: colaboradorParaEditar.funcao,
        // Formata a data para o formato YYYY-MM-DD que o input[type=date] espera
        dataAdmissao: new Date(colaboradorParaEditar.dataAdmissao).toISOString().split('T')[0],
      });
    }
  }, [colaboradorParaEditar, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      // 4. A URL e o método da requisição agora dependem se estamos editando ou criando
      const url = isEditMode ? `/api/colaboradores/${colaboradorParaEditar._id}` : '/api/colaboradores';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha na operação.');

      // 5. Chama a função correta dependendo do modo (criar ou atualizar)
      if (isEditMode) {
        onColaboradorAtualizado(data);
      } else {
        onColaboradorAdicionado(data);
      }
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
        {/* 6. O título do modal também muda */}
        <h2>{isEditMode ? 'Editar Colaborador' : 'Adicionar Novo Colaborador'}</h2>
        <form onSubmit={handleSubmit}>
          {/* ... O restante do formulário (inputs) continua exatamente igual ... */}
          <div className="form-group">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="funcao">Função</label>
            <input type="text" id="funcao" name="funcao" value={formData.funcao} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dataAdmissao">Data de Admissão</label>
            <input type="date" id="dataAdmissao" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleChange} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
            {/* 7. O texto do botão de salvar também muda */}
            <button type="submit" disabled={loading}>{loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Colaborador')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAdicionarColaborador;