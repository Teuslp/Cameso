// backend/middleware/adminMiddleware.js (NOVO ARQUIVO)

export const adminMiddleware = (req, res, next) => {
  // Este middleware deve rodar DEPOIS do authMiddleware,
  // então já teremos acesso a req.user
  if (req.user && req.user.role === 'admin') {
    next(); // Se for admin, pode prosseguir
  } else {
    // Se não for admin, retorna um erro de acesso proibido
    res.status(403).json({ message: "Acesso negado. Requer privilégios de administrador." });
  }
};