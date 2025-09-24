import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    if (!user.ativo) {
      return res.status(403).json({ message: "Esta conta está desativada." });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }
    
    // --- LÓGICA DE RETROCOMPATIBILIDADE ---
    // 1. Determina o tipo de conta, dando prioridade ao novo campo 'tipoConta'.
    //    Se não existir, usa o campo antigo 'role' para converter.
    let userTipoConta = user.tipoConta;
    if (!userTipoConta && user.role) {
      userTipoConta = user.role === 'admin' ? 'admin_master' : 'cliente_master';
    }
    // Garante um valor padrão se ambos forem nulos, embora improvável.
    if (!userTipoConta) {
        return res.status(500).json({ message: "Tipo de conta do utilizador não definido." });
    }
    // -----------------------------------------

    const tokenPayload = { 
      id: user._id, 
      tipoConta: userTipoConta, // 2. Usa a variável corrigida no token
      nome: user.nome
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

    const userResponse = user.toObject();
    delete userResponse.senha;
    userResponse.tipoConta = userTipoConta; // 3. Garante que o campo 'tipoConta' está na resposta

    res.json({ token, user: userResponse });

  } catch (err) {
    console.error("ERRO GERAL NO SERVIDOR:", err);
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilizador não encontrado" });

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

