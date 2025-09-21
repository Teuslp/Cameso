// frontend/src/pages/Cliente/Chamados/DetalheChamado.jsx (VERSÃO PADRONIZADA)

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import './DetalheChamado.css';

const DetalheChamado = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [chamado, setChamado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [novaResposta, setNovaResposta] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' });
    };

    useEffect(() => {
        const fetchChamado = async () => {
            try {
                const response = await api.get(`/chamados/${id}`);
                setChamado(response.data);
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchChamado();
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [chamado]);

    const handleResponder = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/chamados/${id}/responder`, { conteudo: novaResposta });
            setChamado(response.data);
            setNovaResposta('');
        } catch (err) { console.error(err); }
    };
    
    if (loading) return <div>Carregando conversa...</div>;
    if (!chamado) return <div>Chamado não encontrado.</div>;

    return (
        <div className="admin-container"> {/* Usando classe do admin para consistência */}
            <Link to="/cliente/chamados" className="back-link">{"< Voltar para a lista de chamados"}</Link>
            
            <div className="conversa-container">
                <div className="conversa-header">
                    <h3>{chamado.assunto}</h3>
                    <p>Status: {chamado.status}</p>
                </div>
                <div className="conversa-mensagens">
                    {chamado.mensagens && [...chamado.mensagens].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(msg => {
                        // A lógica de verificação de quem é a mensagem
                        const isMyMessage = msg.autor._id === user._id;
                        return (
                            <div key={msg._id} className={`mensagem ${isMyMessage ? 'minha' : 'outra'}`}>
                                <div className="mensagem-autor">{isMyMessage ? 'Você' : msg.autor.nome}</div>
                                <div className="mensagem-conteudo">{msg.conteudo}</div>
                                <div className="mensagem-timestamp">{new Date(msg.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleResponder} className="conversa-resposta">
                    <textarea value={novaResposta} onChange={e => setNovaResposta(e.target.value)}
                        placeholder="Escreva sua resposta..." rows="3" required
                    />
                    <button type="submit">Enviar Resposta</button>
                </form>
            </div>
        </div>
    );
};

export default DetalheChamado;