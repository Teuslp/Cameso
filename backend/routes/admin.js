import express from "express";
import bcrypt from "bcryptjs"; // GARANTIR QUE ESTÁ A USAR 'bcryptjs'
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Acesso negado" });
  next();
};

router.get("/clientes", authMiddleware, isAdmin, async (req, res) => {
  try {
    const clientes = await User.find({ role: "cliente" }).select("-senha");
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar clientes", error: err.message });
  }
});

router.post("/clientes", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10); // Usa bcryptjs
    const newUser = new User({ nome, email, senha: hashedSenha, role: "cliente" });
    await newUser.save();
    
    const userResponse = newUser.toObject();
    delete userResponse.senha;

    res.status(201).json(userResponse);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar cliente", error: err.message });
  }
});

export default router;