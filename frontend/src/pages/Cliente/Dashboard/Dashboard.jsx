// frontend/src/pages/Cliente/Dashboard/Dashboard.jsx (VERSÃO COMPLETA E CORRIGIDA)

import React, { useState, useEffect } from 'react';
import { FaUsers, FaExclamationTriangle, FaCheckCircle, FaCertificate, FaHeartbeat, FaCalendarCheck } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  // Estados para os cards de resumo
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  
  // Estados para a lista de vencimentos
  const [vencimentos, setVencimentos] = useState([]);
  const [loadingVencimentos, setLoadingVencimentos] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    // Função para buscar os dados dos cards
    const fetchSummary = async () => {
      try {
        const response = await fetch('/api/dashboard/summary', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar resumo do dashboard.');
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSummary(false);
      }
    };

    // Função para buscar a lista de próximos vencimentos
    const fetchVencimentos = async () => {
      try {
        const response = await fetch('/api/dashboard/vencimentos', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar vencimentos.');
        const data = await response.json();
        setVencimentos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingVencimentos(false);
      }
    };

    // Executa as duas buscas em paralelo
    fetchSummary();
    fetchVencimentos();
  }, []);

  if (loadingSummary || loadingVencimentos) {
    return <div>Carregando dashboard...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Erro: {error}</div>;
  }

  return (
    <div>
      <h2>Visão Geral</h2>
      
      {/* --- SEÇÃO DOS CARDS DE RESUMO --- */}
      <div className="dashboard-cards-container">
        <div className="dashboard-card">
          <FaUsers size={40} className="card-icon" />
          <div className="card-content">
            <span className="card-value">{summary?.totalColaboradores ?? 0}</span>
            <span className="card-label">Colaboradores Ativos</span>
          </div>
        </div>
        <div className="dashboard-card warning">
          <FaExclamationTriangle size={40} className="card-icon" />
          <div className="card-content">
            <span className="card-value">{summary?.asosAVencer ?? 0}</span>
            <span className="card-label">ASOs a Vencer (Próx. 30 dias)</span>
          </div>
        </div>
        <div className="dashboard-card danger">
          <FaCheckCircle size={40} className="card-icon" />
          <div className="card-content">
            <span className="card-value">{summary?.asosVencidos ?? 0}</span>
            <span className="card-label">ASOs Vencidos</span>
          </div>
        </div>
        <div className="dashboard-card info">
            <FaCertificate size={40} className="card-icon" />
            <div className="card-content">
            <span className="card-value">{summary?.treinamentosAVencer ?? 0}</span>
            <span className="card-label">Treinamentos a Vencer</span>
            </div>
        </div>
      </div>

      {/* --- WIDGET DE PRÓXIMOS VENCIMENTOS --- */}
      <div className="widget-vencimentos">
        <h3>Próximos Vencimentos (30 dias)</h3>
        {vencimentos.length > 0 ? (
          <ul className="vencimentos-list">
            {vencimentos.map(item => (
              <li key={item.id} className="vencimento-item">
                <div className="vencimento-icon">
                  {item.tipo === 'ASO' ? <FaHeartbeat /> : <FaCertificate />}
                </div>
                <div className="vencimento-details">
                  <span className="vencimento-colaborador">{item.colaborador}</span>
                  <span className="vencimento-descricao">{item.descricao}</span>
                </div>
                <div className="vencimento-data">
                  <FaCalendarCheck />
                  <span>{new Date(item.dataVencimento).toLocaleDateString('pt-BR')}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum vencimento nos próximos 30 dias.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;