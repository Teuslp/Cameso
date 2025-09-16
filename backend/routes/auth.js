import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

router.post("/register", async (req, res) => {
  // ... (código de registo permanece igual)
});

// Login
router.post("/login", async (req, res) => {
  console.log("\n--- [NOVA TENTATIVA DE LOGIN] ---"); // Início do log
  try {
    const { email, senha } = req.body;
    
    // 1. Vamos ver se o backend está a receber os dados corretamente
    console.log(`1. Dados recebidos do frontend: Email [${email}], Senha [${senha}]`);

    const user = await User.findOne({ email });
    if (!user) {
        console.log("2. Resultado: Utilizador não encontrado no banco de dados.");
        return res.status(400).json({ message: "Credenciais inválidas" });
    }
    
    // 2. Vamos ver a senha guardada no banco de dados
    console.log("2. Utilizador encontrado. Hash da senha no banco de dados:", user.senha);

    const isMatch = await bcrypt.compare(senha, user.senha);
    
    // 3. Vamos ver o resultado da comparação
    console.log(`3. Resultado da comparação da senha (bcrypt.compare): ${isMatch}`);

    if (!isMatch) {
        console.log("4. Conclusão: As senhas não correspondem. Acesso negado.");
        return res.status(400).json({ message: "Credenciais inválidas" });
    }

    console.log("4. Conclusão: As senhas correspondem! A gerar token...");
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1d" });
    
    // A resposta para o frontend foi alterada para corresponder ao que o Login.jsx espera
    res.json({ token, user: { role: user.role, nome: user.nome, _id: user._id } });

  } catch (err) {
    console.error("5. Ocorreu um erro no servidor:", err);
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
});

export default router;