// frontend/src/pages/Cliente/Chamados/DetalheChamado.jsx (VERSÃO COM ANEXOS)

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import './DetalheChamado.css';
import { FaPaperclip } from 'react-icons/fa'; // Ícone de anexo

const DetalheChamado = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [chamado, setChamado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [novaResposta, setNovaResposta] = useState('');
    const [anexo, setAnexo] = useState(null); // 1. Novo estado para o ficheiro
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null); // Ref para o input de ficheiro

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' });
    };

    useEffect(() => {
        const fetchChamado = async () => {
            try {
                const response = await api.get(`/chamados/${id}`);
                setChamado(response.data);
            } catch (err) { 
                setError("Não foi possível carregar os dados do chamado.");
            } 
            finally { setLoading(false); }
        };
        fetchChamado();
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [chamado]);
    
    // 2. Função para guardar o ficheiro selecionado
    const handleFileChange = (e) => {
        setAnexo(e.target.files[0]);
    };

    const handleResponder = async (e) => {
        e.preventDefault();
        setError('');
        
        // 3. Usar FormData para enviar texto e ficheiro
        const formData = new FormData();
        formData.append('conteudo', novaResposta);
        if (anexo) {
            formData.append('anexo', anexo); // A chave 'anexo' deve ser a mesma do multer no backend
        }

        try {
            // O Axios define o 'Content-Type' como 'multipart/form-data' automaticamente
            const response = await api.post(`/chamados/${id}/responder`, formData);
            setChamado(response.data);
            setNovaResposta('');
            setAnexo(null); // Limpa o anexo após o envio
            if(fileInputRef.current) fileInputRef.current.value = ""; // Limpa o input de ficheiro
        } catch (err) {
            setError(err.response?.data?.message || "Ocorreu um erro ao enviar sua resposta.");
        }
    };
    
    if (loading) return <div>Carregando conversa...</div>;
    if (!chamado) return <div>Chamado não encontrado.</div>;

    const isChamadoFechado = chamado.status === 'Fechado';
    const backendBaseURL = api.defaults.baseURL.replace('/api', ''); // URL base para os downloads

    return (
        <div className="admin-container">
            <Link to="/cliente/chamados" className="back-link">{"< Voltar para a lista de chamados"}</Link>
            
            <div className="conversa-container">
                <div className="conversa-header">
                    <h3>{chamado.assunto}</h3>
                    <p>Status: <span className={`status-${chamado.status?.toLowerCase().replace(' ', '-')}`}>{chamado.status}</span></p>
                </div>
                <div className="conversa-mensagens">
                    {chamado.mensagens && [...chamado.mensagens].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(msg => {
                        const isMyMessage = msg.autor._id === user._id;
                        return (
                            <div key={msg._id} className={`mensagem ${isMyMessage ? 'minha' : 'outra'}`}>
                                <div className="mensagem-autor">{isMyMessage ? 'Você' : msg.autor.nome}</div>
                                <div className="mensagem-conteudo">
                                    <p>{msg.conteudo}</p>
                                    {/* 4. Exibir o link do anexo se ele existir */}
                                    {msg.anexoPath && (
                                        <a 
                                            href={`${backendBaseURL}/${msg.anexoPath.replace(/\\/g, '/')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="anexo-link"
                                        >
                                            <FaPaperclip /> {msg.anexoNome}
                                        </a>
                                    )}
                                </div>
                                <div className="mensagem-timestamp">{new Date(msg.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <div className="conversa-resposta">
                    {isChamadoFechado ? (
                        <div className="chamado-fechado-aviso">
                            <p>Este chamado foi encerrado pelo suporte e não pode mais receber respostas.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleResponder}>
                            <textarea 
                                value={novaResposta} 
                                onChange={e => setNovaResposta(e.target.value)}
                                placeholder="Escreva sua resposta..." 
                                rows="3" 
                                required
                            />
                            <div className="resposta-actions">
                                {/* 5. Botão para acionar o input de ficheiro */}
                                <button type="button" className="anexo-btn" onClick={() => fileInputRef.current.click()}>
                                    <FaPaperclip /> Anexar
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                                <button type="submit">Enviar Resposta</button>
                            </div>
                             {anexo && <span className="anexo-selecionado">Ficheiro selecionado: {anexo.name}</span>}
                        </form>
                    )}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default DetalheChamado;

