// backend/middleware/adminMiddleware.js

export const adminMiddleware = (req, res, next) => {
  // Este middleware deve rodar DEPOIS do authMiddleware,
  // que já nos deu o objeto 'req.user' completo do banco de dados.
  
  // Verificamos se o 'tipoConta' do utilizador existe e se começa com 'admin'
  if (req.user && req.user.tipoConta?.startsWith('admin')) {
    // Se for 'admin_master' ou 'admin_departamento', permite prosseguir
    next(); 
  } else {
    // Se não for um admin, retorna um erro de acesso proibido
    res.status(403).json({ message: "Acesso negado. Requer privilégios de administrador." });
  }
};