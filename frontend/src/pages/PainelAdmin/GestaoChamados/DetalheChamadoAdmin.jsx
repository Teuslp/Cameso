// frontend/src/pages/PainelAdmin/GestaoChamados/DetalheChamadoAdmin.jsx (VERSÃO FINAL COM ANEXOS)

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import './DetalheChamadoAdmin.css';
import { FaPaperclip } from 'react-icons/fa'; // Ícone de anexo

const DetalheChamadoAdmin = () => {
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

  const fetchChamado = async () => {
    try {
      const response = await api.get(`/admin/chamados/${id}`);
      setChamado(response.data);
    } catch (err) {
      setError("Falha ao carregar os dados do chamado.");
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
        formData.append('anexo', anexo); // A chave 'anexo' deve ser a mesma do multer
    }

    try {
      // Usamos a rota de admin para responder
      const response = await api.post(`/admin/chamados/${id}/responder`, formData);
      setChamado(response.data);
      setNovaResposta('');
      setAnexo(null); // Limpa o anexo após o envio
      if(fileInputRef.current) fileInputRef.current.value = ""; // Limpa o input de ficheiro
    } catch (err) {
      setError(err.response?.data?.message || "Ocorreu um erro ao enviar a resposta.");
    }
  };
  
  const handleUpdateStatus = async (novoStatus) => {
    try {
        const response = await api.put(`/admin/chamados/${id}/status`, { status: novoStatus });
        setChamado(response.data);
    } catch(err) {
        setError("Falha ao atualizar o status.");
    }
  }

  if (loading) return <div className="admin-container">Carregando...</div>;
  if (!chamado) return <div className="admin-container">Chamado não encontrado.</div>;

  const isChamadoFechado = chamado.status === 'Fechado';
  const backendBaseURL = api.defaults.baseURL.replace('/api', ''); // URL base para os downloads

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
                <p>Este chamado está encerrado. Para reabrir, altere o status acima.</p>
              </div>
          ) : (
            <form onSubmit={handleResponder}>
              <textarea
                value={novaResposta}
                onChange={e => setNovaResposta(e.target.value)}
                placeholder="Escreva sua resposta como administrador..."
                rows="4" required
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

export default DetalheChamadoAdmin;

