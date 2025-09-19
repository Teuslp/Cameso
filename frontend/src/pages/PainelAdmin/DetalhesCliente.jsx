// frontend/src/pages/PainelAdmin/DetalhesCliente.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PainelAdmin.css'; // Reutilizaremos o mesmo CSS

const DetalhesCliente = () => {
  const { id } = useParams(); // Pega o ID do cliente da URL
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`/api/admin/clientes/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar detalhes do cliente.');
        const data = await response.json();
        setDetalhes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetalhes();
  }, [id]);

  if (loading) return <div className="admin-container">Carregando detalhes...</div>;
  if (error) return <div className="admin-container error-message">Erro: {error}</div>;
  if (!detalhes) return <div className="admin-container">Cliente não encontrado.</div>;

  const { cliente, colaboradores, documentos, asos, treinamentos, chamados } = detalhes;

  return (
    <div className="admin-container">
      <Link to="/admin" className="back-link">{"< Voltar para a lista de clientes"}</Link>
      
      <header className="admin-header">
        <h1>{cliente.razaoSocial || 'Cliente sem Razão Social'}</h1>
        <p>CNPJ: {cliente.cnpj || 'Não informado'}</p>
        <p>Contato: {cliente.nome} ({cliente.email})</p>
      </header>

      {/* Grid de Cards */}
      <div className="details-grid">
        <div className="admin-card">
          <h2>Colaboradores ({colaboradores.length})</h2>
          <ul>
            {colaboradores.slice(0, 5).map(c => <li key={c._id}>{c.nomeCompleto} - {c.funcao}</li>)}
            {colaboradores.length > 5 && <li>...e mais.</li>}
          </ul>
        </div>
        <div className="admin-card">
          <h2>ASOs Recentes ({asos.length})</h2>
          <ul>
            {asos.slice(0, 5).map(a => <li key={a._id}>{a.colaboradorId.nomeCompleto} - Vence em {new Date(a.proximoExame).toLocaleDateString()}</li>)}
            {asos.length > 5 && <li>...e mais.</li>}
          </ul>
        </div>
        <div className="admin-card">
          <h2>Treinamentos Recentes ({treinamentos.length})</h2>
          <ul>
            {treinamentos.slice(0, 5).map(t => <li key={t._id}>{t.colaboradorId.nomeCompleto} - {t.treinamentoId.nome}</li>)}
            {treinamentos.length > 5 && <li>...e mais.</li>}
          </ul>
        </div>
        <div className="admin-card">
          <h2>Chamados de Suporte ({chamados.length})</h2>
          <ul>
            {chamados.slice(0, 5).map(c => <li key={c._id}>{c.assunto} - ({c.status})</li>)}
            {chamados.length > 5 && <li>...e mais.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetalhesCliente;