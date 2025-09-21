// backend/controllers/authController.js (VERSÃO COM DIAGNÓSTICOS)

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// A função 'register' que será usada pelo Painel do Admin no futuro
export const register = async (req, res) => {
  // ... (lógica de registro)
};

// --- FUNÇÃO DE LOGIN COM LOGS DETALHADOS ---
export const login = async (req, res) => {
  console.log("\n--- [NOVA TENTATIVA DE LOGIN] ---");
  try {
    const { email, senha } = req.body;

    // 1. Vamos ver se o backend está recebendo os dados corretamente
    console.log(`1. Dados recebidos do frontend: Email [${email}], Senha [${senha}]`);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("2. Resultado: Usuário não encontrado no banco de dados com este email.");
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    // 2. Vamos ver o hash da senha que está no banco
    console.log(`2. Usuário '${user.nome}' encontrado. Hash da senha no banco: ${user.senha.substring(0, 15)}...`);

    // 3. Compara a senha enviada com o hash do banco
    const isMatch = await bcrypt.compare(senha, user.senha);

    // 4. Vamos ver o resultado da comparação
    console.log(`4. Resultado da comparação da senha (bcrypt.compare): ${isMatch}`);

    if (!isMatch) {
      console.log("5. Conclusão: As senhas NÃO correspondem. Acesso negado.");
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    console.log("5. Conclusão: As senhas correspondem! Gerando token...");
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { role: user.role, nome: user.nome, _id: user._id } });

  } catch (err) {
    console.error("ERRO GERAL NO SERVIDOR:", err);
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
};


// Função de alterar senha



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