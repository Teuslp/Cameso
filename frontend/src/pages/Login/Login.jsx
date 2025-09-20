// frontend/src/pages/Login/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios'; // <-- usamos a instância do axios configurada
import logo from '../../assets/logoc.png';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Agora chamamos o backend usando axios
      const response = await api.post('/auth/login', { email, senha });
      const data = response.data;

      setLoading(false);
      setLoginSuccess(true);

      setTimeout(() => {
        login(data.user, data.token);
        navigate(data.user.role === 'admin' ? '/admin' : '/cliente');
      }, 1500);

    } catch (err) {
      console.error("Erro no login:", err);

      // Captura erro do backend ou erro de rede
      const errorMessage =
        err.response?.data?.message ||
        'Falha no login. Verifique suas credenciais ou tente novamente.';

      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        <div className="login-branding">
          <img src={logo} alt="Cameso Logo" />
          <h1>Bem-vindo ao Portal do Cliente</h1>
          <p>Sua plataforma completa para gestão de Saúde e Segurança do Trabalho.</p>
        </div>

        <div className="login-form-wrapper">
          <h2>Acesse sua conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input 
                type="password" 
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            
            <button 
              type="submit" 
              className={`login-btn ${loginSuccess ? 'success' : ''}`} 
              disabled={loading || loginSuccess}
            >
              {loading ? 'Entrando...' : (loginSuccess ? 'Bem-vindo!' : 'Entrar')}
            </button>
            
            <div className="login-links">
              <Link to="/esqueci-senha">Esqueceu sua senha?</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
