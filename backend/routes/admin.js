import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Middleware para verificar se é admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Acesso negado" });
  next();
};

// Listar todos os clientes
router.get("/clientes", authMiddleware, isAdmin, async (req, res) => {
  try {
    const clientes = await User.find({ role: "cliente" }).select("-senha");
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar clientes", error: err.message });
  }
});

// Criar cliente
router.post("/clientes", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10);
    const newUser = new User({ nome, email, senha: hashedSenha, role: "cliente" });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar cliente", error: err.message });
  }
});

// Aqui você pode adicionar outras rotas: funcionários, exames, upload de documentos, relatórios, etc.

export default router;
