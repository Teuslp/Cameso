// frontend/src/pages/Cliente/Perfil/Perfil.jsx (VERSÃO 100% COMPLETA E FINAL)

import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Perfil.css';

// Função auxiliar para calcular a força da senha
const calcularForcaSenha = (senha) => {
    let pontuacao = 0;
    if (senha.length >= 8) pontuacao++;
    if (/[A-Z]/.test(senha)) pontuacao++;
    if (/[0-9]/.test(senha)) pontuacao++;
    if (/[^A-Za-z0-9]/.test(senha)) pontuacao++;
    
    switch (pontuacao) {
        case 1: return { texto: 'Fraca', cor: '#dc3545', largura: '25%' };
        case 2: return { texto: 'Média', cor: '#ffc107', largura: '50%' };
        case 3: return { texto: 'Forte', cor: '#28a745', largura: '75%' };
        case 4: return { texto: 'Muito Forte', cor: '#198754', largura: '100%' };
        default: return { texto: '', cor: '#eee', largura: '0%' };
    }
};

const Perfil = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('info');
  const [perfil, setPerfil] = useState({ nome: '', email: '', razaoSocial: '', cnpj: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalPerfil, setOriginalPerfil] = useState(null);
  const [editStatus, setEditStatus] = useState({ loading: false, error: null, success: null });

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [passwordStatus, setPasswordStatus] = useState({ loading: false, error: null, success: null });
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [forcaSenha, setForcaSenha] = useState({ texto: '', cor: '#eee', largura: '0%' });

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/perfil', { headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) throw new Error('Falha ao carregar dados do perfil.');
        const data = await response.json();
        setPerfil(data);
        setOriginalPerfil(data);
      } catch (err) {
        setEditStatus({ loading: false, error: err.message, success: null });
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  const toggleSecao = (nomeSecao) => {
    setSecaoAtiva(secaoAtiva === nomeSecao ? null : nomeSecao);
  };

  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdatePerfil = async (e) => {
    e.preventDefault();
    setEditStatus({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/perfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ nome: perfil.nome, email: perfil.email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao atualizar perfil.');
      
      setPerfil(data);
      setOriginalPerfil(data);
      setEditStatus({ loading: false, error: null, success: 'Perfil atualizado com sucesso!' });
      setIsEditing(false);
    } catch (err) {
      setEditStatus({ loading: false, error: err.message, success: null });
    }
  };

  const handleCancelEdit = () => {
    setPerfil(originalPerfil);
    setIsEditing(false);
    setEditStatus({ loading: false, error: null, success: null });
  };

  const handleNovaSenhaChange = (e) => {
    const senha = e.target.value;
    setNovaSenha(senha);
    setForcaSenha(calcularForcaSenha(senha));
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setPasswordStatus({ loading: true, error: null, success: null });
    if (novaSenha !== confirmarNovaSenha) return setPasswordStatus({ loading: false, error: 'As novas senhas não correspondem.', success: null });
    if (novaSenha.length < 6) return setPasswordStatus({ loading: false, error: 'A nova senha deve ter no mínimo 6 caracteres.', success: null });

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ senhaAtual, novaSenha })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao alterar a senha.');

      setPasswordStatus({ loading: false, error: null, success: 'Senha alterada com sucesso!' });
      setSenhaAtual(''); setNovaSenha(''); setConfirmarNovaSenha('');
    } catch (err) {
      setPasswordStatus({ loading: false, error: err.message, success: null });
    }
  };

  if (loading) return <div>Carregando perfil...</div>;

  return (
    <div className="perfil-page">
      <h2>Meu Perfil</h2>
      <div className="acordeao-container">
        {/* Item 1: Informações da Conta */}
        <div className="acordeao-item">
          <button className="acordeao-header" onClick={() => toggleSecao('info')}>
            <h3>Informações da Conta</h3>
            <span className="acordeao-icon">{secaoAtiva === 'info' ? <FaChevronUp /> : <FaChevronDown />}</span>
          </button>
          <div className={`acordeao-conteudo ${secaoAtiva === 'info' ? 'open' : ''}`}>
            <form onSubmit={handleUpdatePerfil}>
              <div className="form-group"><label>Razão Social</label><input type="text" value={perfil.razaoSocial || ''} disabled /></div>
              <div className="form-group"><label>CNPJ</label><input type="text" value={perfil.cnpj || ''} disabled /></div>
              <div className="form-group"><label htmlFor="nome">Nome do Contato</label><input type="text" id="nome" name="nome" value={perfil.nome || ''} onChange={handlePerfilChange} disabled={!isEditing} /></div>
              <div className="form-group"><label htmlFor="email">Email de Contato</label><input type="email" id="email" name="email" value={perfil.email || ''} onChange={handlePerfilChange} disabled={!isEditing} /></div>
              {isEditing ? (
                  <div className="form-actions"><button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancelar</button><button type="submit" className="save-btn" disabled={editStatus.loading}>{editStatus.loading ? 'Salvando...' : 'Salvar Alterações'}</button></div>
              ) : (
                  <div className="form-actions"><button type="button" className="edit-btn" onClick={() => setIsEditing(true)}>Editar</button></div>
              )}
              {editStatus.error && <p className="status-message error">{editStatus.error}</p>}
              {editStatus.success && <p className="status-message success">{editStatus.success}</p>}
            </form>
          </div>
        </div>

        {/* Item 2: Alterar Senha */}
        <div className="acordeao-item">
          <button className="acordeao-header" onClick={() => toggleSecao('senha')}>
            <h3>Alterar Senha</h3>
            <span className="acordeao-icon">{secaoAtiva === 'senha' ? <FaChevronUp /> : <FaChevronDown />}</span>
          </button>
          <div className={`acordeao-conteudo ${secaoAtiva === 'senha' ? 'open' : ''}`}>
            <form onSubmit={handleSubmitPassword}>
              <div className="form-group password-group">
                <label htmlFor="senhaAtual">Senha Atual</label>
                <input type={showSenhaAtual ? 'text' : 'password'} id="senhaAtual" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} required />
                <span className="password-icon" onClick={() => setShowSenhaAtual(!showSenhaAtual)}>{showSenhaAtual ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
              <div className="form-group password-group">
                <label htmlFor="novaSenha">Nova Senha</label>
                <input type={showNovaSenha ? 'text' : 'password'} id="novaSenha" value={novaSenha} onChange={handleNovaSenhaChange} required />
                <span className="password-icon" onClick={() => setShowNovaSenha(!showNovaSenha)}>{showNovaSenha ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
              <div className="strength-meter">
                <div className="strength-bar" style={{ width: forcaSenha.largura, backgroundColor: forcaSenha.cor }}></div>
              </div>
              <small className="strength-label" style={{ color: forcaSenha.cor, minHeight: '1.2em' }}>{forcaSenha.texto}</small>
              <div className="form-group password-group">
                <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
                <input type={showConfirmarSenha ? 'text' : 'password'} id="confirmarNovaSenha" value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)} required />
                <span className="password-icon" onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}>{showConfirmarSenha ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
              <button type="submit" className="save-btn" disabled={passwordStatus.loading}>{passwordStatus.loading ? 'Salvando...' : 'Salvar Nova Senha'}</button>
              {passwordStatus.error && <p className="status-message error">{passwordStatus.error}</p>}
              {passwordStatus.success && <p className="status-message success">{passwordStatus.success}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;