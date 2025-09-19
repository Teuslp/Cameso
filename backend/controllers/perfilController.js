// backend/controllers/perfilController.js (NOVO ARQUIVO)

import User from '../models/User.js';

// Busca os dados do perfil do usuário logado
export const getPerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    // Usamos .select('-senha') para nunca enviar a senha hash para o front-end
    const user = await User.findById(userId).select('-senha');
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil." });
  }
};

// Atualiza os dados do perfil (nome e email)
export const updatePerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nome, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    user.nome = nome || user.nome;
    user.email = email || user.email;

    await user.save();
    // Retorna o usuário atualizado (sem a senha)
    const userAtualizado = await User.findById(userId).select('-senha');
    res.status(200).json(userAtualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar perfil." });
  }
};