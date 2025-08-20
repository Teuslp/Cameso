import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user")); // pega usuário logado

  if (!user) {
    // se não tem usuário logado, volta pro login
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // se tentou acessar rota errada, volta pra home
    return <Navigate to="/" replace />;
  }

  return children;
}
