// frontend/src/pages/Cliente/Dashboard/Dashboard.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import { FaUsers, FaExclamationTriangle, FaCheckCircle, FaCertificate } from 'react-icons/fa';
import './Dashboard.css'; // Criaremos este arquivo a seguir

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/dashboard/summary', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do dashboard.');
        }
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div>Carregando resumo...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Erro: {error}</div>;
  }

  return (
    <div>
      <h2>Visão Geral</h2>
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
    </div>
  );
};

export default Dashboard;