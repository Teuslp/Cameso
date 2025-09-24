import jwt from "jsonwebtoken";
import User from '../models/User.js'; // 1. Importar o Model de User

const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

export const authMiddleware = async (req, res, next) => { // 2. Transformar em async
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, SECRET);
    
    // 3. Buscar o utilizador completo no banco de dados
    //    Isto garante que temos sempre os dados mais recentes (incluindo tipoConta e permissões)
    const user = await User.findById(decodedToken.id).select('-senha');
    if (!user) {
        return res.status(401).json({ message: "Utilizador não encontrado." });
    }

    req.user = user; // Agora req.user é o objeto completo do Mongoose
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
