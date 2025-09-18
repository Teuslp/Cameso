// frontend/src/pages/Cliente/Funcoes/FormFuncao.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FormFuncao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Estados dos catálogos
  const [riscos, setRiscos] = useState([]);
  const [exames, setExames] = useState([]);
  const [treinamentos, setTreinamentos] = useState([]);

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [riscosSelecionados, setRiscosSelecionados] = useState([]);
  const [examesSelecionados, setExamesSelecionados] = useState([]);
  const [treinamentosSelecionados, setTreinamentosSelecionados] = useState([]);
  
  // Busca todos os dados necessários (catálogos e dados da função, se estiver editando)
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    const fetchCatalogos = async () => {
      const [riscosRes, examesRes, treinamentosRes] = await Promise.all([
        fetch('/api/riscos', { headers }),
        fetch('/api/exames', { headers }),
        fetch('/api/treinamentos', { headers })
      ]);
      setRiscos(await riscosRes.json());
      setExames(await examesRes.json());
      setTreinamentos(await treinamentosRes.json());
    };

    const fetchFuncao = async () => {
      const response = await fetch(`/api/funcoes/${id}`, { headers });
      const data = await response.json();
      setNome(data.nome);
      setRiscosSelecionados(data.riscos.map(r => r._id));
      setExamesSelecionados(data.examesRequeridos.map(e => e._id));
      setTreinamentosSelecionados(data.treinamentosRequeridos.map(t => t._id));
    };

    fetchCatalogos();
    if (isEditMode) {
      fetchFuncao();
    }
  }, [id, isEditMode]);

  // Lógica para lidar com a seleção das checkboxes
  const handleCheckboxChange = (id, state, setState) => {
    if (state.includes(id)) {
      setState(state.filter(itemId => itemId !== id));
    } else {
      setState([...state, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    const url = isEditMode ? `/api/funcoes/${id}` : '/api/funcoes';
    const method = isEditMode ? 'PUT' : 'POST';

    const body = JSON.stringify({
      nome,
      riscos: riscosSelecionados,
      examesRequeridos: examesSelecionados,
      treinamentosRequeridos: treinamentosSelecionados
    });

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body
    });
    
    navigate('/cliente/funcoes');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/cliente/funcoes">{"< Voltar"}</Link>
      <h2>{isEditMode ? 'Editar Função' : 'Adicionar Nova Função'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Nome da Função</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={{ width: '100%', padding: '8px' }}/>
        </div>

        {/* Checkboxes para Riscos, Exames e Treinamentos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div>
            <h3>Riscos Associados</h3>
            {riscos.map(risco => (
              <div key={risco._id}>
                <input type="checkbox" id={risco._id} checked={riscosSelecionados.includes(risco._id)} onChange={() => handleCheckboxChange(risco._id, riscosSelecionados, setRiscosSelecionados)} />
                <label htmlFor={risco._id}>{risco.nome}</label>
              </div>
            ))}
          </div>
          <div>
            <h3>Exames Requeridos</h3>
            {exames.map(exame => (
              <div key={exame._id}>
                <input type="checkbox" id={exame._id} checked={examesSelecionados.includes(exame._id)} onChange={() => handleCheckboxChange(exame._id, examesSelecionados, setExamesSelecionados)} />
                <label htmlFor={exame._id}>{exame.nome}</label>
              </div>
            ))}
          </div>
          <div>
            <h3>Treinamentos Requeridos</h3>
            {treinamentos.map(treinamento => (
              <div key={treinamento._id}>
                <input type="checkbox" id={treinamento._id} checked={treinamentosSelecionados.includes(treinamento._id)} onChange={() => handleCheckboxChange(treinamento._id, treinamentosSelecionados, setTreinamentosSelecionados)} />
                <label htmlFor={treinamento._id}>{treinamento.nome}</label>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" style={{ marginTop: '20px', padding: '10px 15px' }}>Salvar</button>
      </form>
    </div>
  );
};

export default FormFuncao;