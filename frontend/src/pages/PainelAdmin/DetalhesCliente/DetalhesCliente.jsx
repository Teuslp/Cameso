// frontend/src/pages/PainelAdmin/DetalhesCliente/DetalhesCliente.jsx (VERSÃO CORRIGIDA)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './DetalhesCliente.css';
import api from '../../../api/axios'; // Já estava importado corretamente

const DetalhesCliente = () => {
  const { id } = useParams();
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [secaoAtiva, setSecaoAtiva] = useState(null);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        // --- CORREÇÃO APLICADA AQUI ---
        // 1. Usar a instância 'api' (Axios)
        // 2. Remover a lógica manual do token
        // 3. Corrigir a URL para não duplicar o '/api'
        const response = await api.get(`/admin/clientes/${id}`);
        setDetalhes(response.data);

      } catch (err) {
        setError(err.response?.data?.message || 'Falha ao buscar detalhes do cliente.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetalhes();
  }, [id]);

  const toggleSecao = (nomeSecao) => {
    setSecaoAtiva(secaoAtiva === nomeSecao ? null : nomeSecao);
  };

  if (loading) return <div className="admin-container">Carregando detalhes...</div>;
  if (error) return <div className="admin-container error-message">Erro: {error}</div>;
  if (!detalhes) return <div className="admin-container">Cliente não encontrado.</div>;

  const { cliente, colaboradores, documentos, asos, treinamentos, chamados } = detalhes;

  return (
    <div className="details-container">
      <Link to="/admin" className="back-link">{"< Voltar para a lista de clientes"}</Link>
      
      <header className="details-header">
        <h1>{cliente.razaoSocial || 'Cliente sem Razão Social'}</h1>
        <p>CNPJ: {cliente.cnpj || 'Não informado'}</p>
        <p>Contato: {cliente.nome} ({cliente.email})</p>
      </header>

      {/* Acordeão para as seções de detalhes */}
      <div className="details-accordion">
        {/* Seção de Colaboradores */}
        <div className={`details-accordion-item ${secaoAtiva === 'colaboradores' ? 'open' : ''}`}>
          <button className="details-accordion-header" onClick={() => toggleSecao('colaboradores')}>
            <h2>Colaboradores ({colaboradores.length})</h2>
            <span className="details-accordion-icon">{secaoAtiva === 'colaboradores' ? <FaChevronUp /> : <FaChevronDown />}</span>
          </button>
          <div className={`details-accordion-content ${secaoAtiva === 'colaboradores' ? 'open' : ''}`}>
            <div className="details-content-padding">
              {colaboradores.length > 0 ? (
                <ul style={{listStyle: 'none', padding: 0}}>
                    {colaboradores.map(c => <li key={c._id}>{c.nomeCompleto} - {c.funcao}</li>)}
                </ul>
              ) : <p>Nenhum colaborador cadastrado.</p>}
            </div>
          </div>
        </div>
        
        {/* Seção de ASOs */}
        <div className={`details-accordion-item ${secaoAtiva === 'asos' ? 'open' : ''}`}>
          <button className="details-accordion-header" onClick={() => toggleSecao('asos')}>
            <h2>ASOs Recentes ({asos.length})</h2>
            <span className="details-accordion-icon">{secaoAtiva === 'asos' ? <FaChevronUp /> : <FaChevronDown />}</span>
          </button>
          <div className={`details-accordion-content ${secaoAtiva === 'asos' ? 'open' : ''}`}>
            <div className="details-content-padding">
                {asos.length > 0 ? (
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {asos.map(a => <li key={a._id}>{(a.colaboradorId?.nomeCompleto || 'Colaborador Inválido')} - Vence em {new Date(a.proximoExame).toLocaleDateString()}</li>)}
                    </ul>
                ) : <p>Nenhum ASO recente.</p>}
            </div>
          </div>
        </div>

        {/* Adicione outras seções (Treinamentos, Chamados, etc.) seguindo o mesmo padrão */}
      </div>
    </div>
  );
};

export default DetalhesCliente;
