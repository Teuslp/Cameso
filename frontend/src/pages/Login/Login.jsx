import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import LOGO from "../../assets/logoc.png";
import "./Login.css";
import { AuthContext } from "../../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    // Simulação de login
    let userData;
    if (email === "admin@teste.com" && senha === "1234") {
      userData = { email, role: "admin" };
    } else if (email === "cliente@teste.com" && senha === "1234") {
      userData = { email, role: "cliente" };
    } else {
      setErro("Credenciais inválidas!");
      return;
    }

    // Salvar no AuthContext e localStorage
    login(userData);

    // Redirecionar para o painel certo
    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/cliente");
    }

    setErro("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <img src={LOGO} alt="Logo da Clínica" />
        </div>

        <h1 className="login-title">Área Restrita</h1>
        <p className="login-subtitle">Acesse com suas credenciais</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {erro && <p className="erro-msg">{erro}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-footer">
          <a href="#">Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
}
