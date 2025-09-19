// backend/controllers/notificacaoController.js (NOVO ARQUIVO)

import Notificacao from '../models/Notificacao.js';

/**
 * Busca as notificações mais recentes para o cliente logado.
 */
export const getNotificacoes = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const notificacoes = await Notificacao.find({ clienteId })
      .sort({ createdAt: -1 }) // Mais recentes primeiro
      .limit(20); // Limita a um número razoável de notificações

    res.status(200).json(notificacoes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar notificações." });
  }
};

/**
 * Marca uma notificação específica como lida.
 */
export const marcarComoLida = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const { id: notificacaoId } = req.params;

    // Encontra e atualiza, garantindo que a notificação pertence ao cliente logado
    const notificacao = await Notificacao.findOneAndUpdate(
      { _id: notificacaoId, clienteId: clienteId },
      { lida: true },
      { new: true } // Retorna o documento atualizado
    );

    if (!notificacao) {
      return res.status(404).json({ message: "Notificação não encontrada." });
    }
    res.status(200).json(notificacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao marcar notificação como lida." });
  }
};

/**
 * Marca todas as notificações de um cliente como lidas.
 */
export const marcarTodasComoLidas = async (req, res) => {
  try {
    const clienteId = req.user.id;
    await Notificacao.updateMany(
      { clienteId: clienteId, lida: false },
      { lida: true }
    );
    res.status(200).json({ message: "Todas as notificações foram marcadas como lidas." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao marcar todas as notificações como lidas." });
  }
};