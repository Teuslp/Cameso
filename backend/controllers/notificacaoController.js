// backend/controllers/notificacaoController.js (VERSÃO 100% COMPLETA E CORRIGIDA)

import Notificacao from '../models/Notificacao.js';

/**
 * Busca as notificações mais recentes para o usuário logado (cliente ou admin).
 */
export const getNotificacoes = async (req, res) => {
  try {
    let query = {};
    
    // Se o usuário for um admin, busca notificações marcadas para admin.
    if (req.user.role === 'admin') {
      query = { paraAdmin: true };
    } 
    // Se for cliente, busca notificações para o seu ID que não são para admin.
    else {
      query = { clienteId: req.user.id, paraAdmin: false };
    }

    const notificacoes = await Notificacao.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

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
    const userId = req.user.id;
    const { id: notificacaoId } = req.params;

    // Constrói a query de segurança: se for admin, pode marcar qualquer notificação
    // para admin. Se for cliente, só pode marcar as suas.
    const query = req.user.role === 'admin'
        ? { _id: notificacaoId, paraAdmin: true }
        : { _id: notificacaoId, clienteId: userId };

    const notificacao = await Notificacao.findOneAndUpdate(
      query,
      { lida: true },
      { new: true }
    );

    if (!notificacao) {
      return res.status(404).json({ message: "Notificação não encontrada ou permissão negada." });
    }
    res.status(200).json(notificacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao marcar notificação como lida." });
  }
};

/**
 * Marca todas as notificações de um usuário como lidas.
 */
export const marcarTodasComoLidas = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'admin') {
      query = { paraAdmin: true, lida: false };
    } else {
      query = { clienteId: req.user.id, lida: false };
    }

    await Notificacao.updateMany(query, { lida: true });
    res.status(200).json({ message: "Todas as notificações foram marcadas como lidas." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao marcar todas as notificações como lidas." });
  }
};