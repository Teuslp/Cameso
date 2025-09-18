// frontend/src/pages/Cliente/Colaboradores/FormAdicionarColaborador.jsx (VERSÃO CORRIGIDA)

import React, { useState, useEffect } from 'react';
import './FormAdicionarColaborador.css';

const FormAdicionarColaborador = ({ onClose, onColaboradorAdicionado, colaboradorParaEditar, onColaboradorAtualizado }) => {
  // Estado para a lista de funções disponíveis no dropdown
  const [funcoesDisponiveis, setFuncoesDisponiveis] = useState([]);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    funcao: '',
    dataAdmissao: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(colaboradorParaEditar);

  // Busca a lista de funções para preencher o dropdown
  useEffect(() => {
    const fetchFuncoes = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/funcoes', { headers: { 'Authorization': `Bearer ${token}` } });
        if(response.ok) {
          const data = await response.json();
          setFuncoesDisponiveis(data);
        }
      } catch (error) {
        console.error("Erro ao buscar funções", error);
      }
    };
    fetchFuncoes();
  }, []);

  // Preenche o formulário com dados existentes se estiver no modo de edição
  useEffect(() => {
    if (isEditMode && colaboradorParaEditar) {
      setFormData({
        nomeCompleto: colaboradorParaEditar.nomeCompleto,
        cpf: colaboradorParaEditar.cpf,
        funcao: colaboradorParaEditar.funcao,
        dataAdmissao: new Date(colaboradorParaEditar.dataAdmissao).toISOString().split('T')[0],
      });
    }
  }, [colaboradorParaEditar, isEditMode]);

  // --- FUNÇÃO HANDCHANGE CORRIGIDA ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // --- FUNÇÃO HANDLESUBMIT CORRIGIDA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        const token = localStorage.getItem('userToken');
        const url = isEditMode ? `/api/colaboradores/${colaboradorParaEditar._id}` : '/api/colaboradores';
        const method = isEditMode ? 'PUT' : 'POST';
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.message || 'Falha na operação.');
        
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
        <h2>{isEditMode ? 'Editar Colaborador' : 'Adicionar Novo Colaborador'}</h2>
        <form onSubmit={handleSubmit}>
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
            <select id="funcao" name="funcao" value={formData.funcao} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
              <option value="">Selecione a função</option>
              {funcoesDisponiveis.map(funcao => (
                <option key={funcao._id} value={funcao.nome}>
                  {funcao.nome}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="dataAdmissao">Data de Admissão</label>
            <input type="date" id="dataAdmissao" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleChange} required />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
            <button type="submit" disabled={loading}>{loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Colaborador')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAdicionarColaborador;