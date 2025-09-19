// backend/controllers/authController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const SECRET = "segredo_super_secreto"; // ⚠️ depois coloque no .env

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // Valida a senha
    const validPass = await bcrypt.compare(senha, user.senha);
    if (!validPass) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Gera token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1h" });

    // Remove o campo "senha" antes de devolver o usuário
    const { senha: _, ...userData } = user.toObject();

    res.json({
      token,
      user: userData, // agora o frontend pode acessar user.role, user.nome, etc.
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const verifyToken = (req, res) => {
  res.json({ message: "Token válido", user: req.user });
};

export const changePassword = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(senhaAtual, user.senha);
    if (!isMatch) return res.status(400).json({ message: "Senha atual incorreta" });

    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(novaSenha, salt);

    await user.save();

    res.json({ message: "Senha alterada com sucesso!" });
  } catch (err) {
    console.error("Erro ao alterar senha:", err);
    res.status(500).json({ message: "Erro no servidor ao tentar alterar senha" });
  }
};
