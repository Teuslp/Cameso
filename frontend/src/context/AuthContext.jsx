import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carrega o utilizador do localStorage de forma segura na inicialização
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      // Verifica se o 'storedUser' não é nulo nem a string "undefined"
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar dados do utilizador:", error);
      // Limpa dados corrompidos se o parse falhar
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
    }
  }, []);

  // A função login aceita os dados do utilizador e o token
  const login = (userData, token) => {
    // Guarda ambos os itens no localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userToken", token);
    // Atualiza o estado da aplicação
    setUser(userData);
  };

  const logout = () => {
    // Remove ambos os itens ao fazer logout
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    setUser(null);
  };

  // O valor fornecido pelo contexto inclui o utilizador e as funções
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para facilitar o uso do contexto noutros componentes
export function useAuth() {
  return useContext(AuthContext);
}