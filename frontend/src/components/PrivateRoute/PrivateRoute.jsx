import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 1. Usar o hook useAuth

export default function PrivateRoute({ children, role }) {
  const { user } = useAuth(); // 2. Obter o utilizador a partir do contexto

  if (!user) {
    // Se não há utilizador no contexto, redireciona para o login
    return <Navigate to="/login" replace />;
  }

  // 3. LÓGICA ATUALIZADA PARA 'tipoConta'
  // Verifica se o 'tipoConta' do utilizador começa com o 'role' esperado (ex: 'admin' ou 'cliente')
  if (role && !user.tipoConta?.startsWith(role)) {
    // Se o tipo de conta não corresponde, redireciona para a página inicial
    return <Navigate to="/" replace />;
  }

  // Se tudo estiver correto, renderiza a página pedida
  return children;
}
