import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Middleware para verificar se é cliente
const isCliente = (req, res, next) => {
  if (req.user.role !== "cliente") return res.status(403).json({ message: "Acesso negado" });
  next();
};

// Buscar dados do cliente logado
router.get("/me", authMiddleware, isCliente, async (req, res) => {
  try {
    const cliente = await User.findById(req.user.id).select("-senha");
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar dados do cliente", error: err.message });
  }
});

// Aqui você pode adicionar rotas para documentos, exames, relatórios, mensagens, etc.

export default router;
