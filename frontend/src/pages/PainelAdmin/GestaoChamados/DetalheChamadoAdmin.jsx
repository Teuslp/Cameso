// CÓDIGO 100% COMPLETO PARA 'DetalheChamadoAdmin.jsx'

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import './DetalheChamadoAdmin.css';

const DetalheChamadoAdmin = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [novaResposta, setNovaResposta] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' });
  };

  const fetchChamado = async () => {
    try {
      const response = await api.get(`/admin/chamados/${id}`);
      setChamado(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChamado();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [chamado]);

  const handleResponder = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/admin/chamados/${id}/responder`, { conteudo: novaResposta });
      setChamado(response.data);
      setNovaResposta('');
    } catch (err) {
      console.error('Erro ao enviar resposta:', err);
    }
  };
  
  const handleUpdateStatus = async (novoStatus) => {
    try {
        const response = await api.put(`/api/admin/chamados/${id}/status`, { status: novoStatus });
        setChamado(response.data);
    } catch(err) {
        console.error('Erro ao atualizar status:', err);
    }
  }

  if (loading) return <div className="admin-container">Carregando...</div>;
  if (!chamado) return <div className="admin-container">Chamado não encontrado.</div>;

  return (
    <div className="admin-container">
      <Link to="/admin/chamados" className="back-link">{"< Voltar para a lista de chamados"}</Link>
      
      <div className="conversa-container">
        <div className="conversa-header">
          <h3>{chamado.assunto}</h3>
          <p>Cliente: {chamado.clienteId?.razaoSocial || chamado.clienteId?.nome}</p>
          <div className="status-actions">
            <span>Status Atual: </span>
            <select onChange={(e) => handleUpdateStatus(e.target.value)} value={chamado.status}>
              <option value="Aberto">Aberto</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Fechado">Fechado</option>
            </select>
          </div>
        </div>

        <div className="conversa-mensagens">
            {chamado.mensagens && [...chamado.mensagens].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(msg => {
                const isAdminMessage = msg.autor.role === 'admin';
                return (
                    <div key={msg._id} className={`mensagem ${isAdminMessage ? 'minha' : 'outra'}`}>
                        <div className="mensagem-autor">{isAdminMessage ? 'Você (Admin)' : msg.autor.nome}</div>
                        <div className="mensagem-conteudo">{msg.conteudo}</div>
                        <div className="mensagem-timestamp">{new Date(msg.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>

        <div className="conversa-resposta">
          <form onSubmit={handleResponder}>
            <textarea
              value={novaResposta}
              onChange={e => setNovaResposta(e.target.value)}
              placeholder="Escreva sua resposta como administrador..."
              rows="4" required
            />
            <button type="submit">Enviar Resposta</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetalheChamadoAdmin;