import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

// Registro de usuário (pode ser usado para criar admins e clientes)
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Usuário já existe" });

    const hashedSenha = await bcrypt.hash(senha, 10);

    const newUser = new User({ nome, email, senha: hashedSenha, role });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ message: "Credenciais inválidas" });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1d" });

    res.json({ token, role: user.role, nome: user.nome });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
});

export default router;
