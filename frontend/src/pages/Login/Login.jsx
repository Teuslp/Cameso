import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import LOGO from "../../assets/logoc.png";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        senha,
      });

      const { token, user } = response.data;
      
      // ALTERAÇÃO AQUI: Passa o token e o utilizador para a função de contexto
      login(user, token);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.";
      setErro(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // O seu JSX permanece o mesmo
  return (
    <div className="login-container">
      {/* ... */}
      <form onSubmit={handleLogin} className="login-form">
          {/* ... */}
          <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
          {/* ... */}
          <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>
            {erro && <p className="erro-msg">{erro}</p>}
            <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
      </form>
      {/* ... */}
    </div>
  );
}