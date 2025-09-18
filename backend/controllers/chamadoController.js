// backend/controllers/chamadoController.js (NOVO ARQUIVO)

import Chamado from '../models/Chamado.js';

/**
 * Cliente cria um novo chamado (ticket).
 */
export const createChamado = async (req, res) => {
  try {
    const { assunto, conteudo } = req.body;
    const clienteId = req.user.id;

    if (!assunto || !conteudo) {
      return res.status(400).json({ message: "Assunto e conteúdo da mensagem são obrigatórios." });
    }

    const novoChamado = new Chamado({
      assunto,
      clienteId,
      participantes: [clienteId], // O cliente inicia como participante
      mensagens: [{ // A primeira mensagem do chamado
        autor: clienteId,
        conteudo: conteudo,
      }],
    });

    await novoChamado.save();
    res.status(201).json(novoChamado);

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao abrir chamado." });
  }
};

/**
 * Lista todos os chamados de um cliente.
 */
export const getChamados = async (req, res) => {
  try {
    const clienteId = req.user.id;
    // Busca sem as mensagens para a lista ficar mais leve
    const chamados = await Chamado.find({ clienteId: clienteId })
      .select('-mensagens')
      .sort({ updatedAt: -1 });

    res.status(200).json(chamados);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao listar chamados." });
  }
};

/**
 * Busca um chamado específico com todas as suas mensagens.
 */
export const getChamadoById = async (req, res) => {
    try {
        const clienteId = req.user.id;
        const chamadoId = req.params.id;

        const chamado = await Chamado.findOne({ _id: chamadoId, clienteId: clienteId })
            .populate('mensagens.autor', 'nome role'); // Busca nome e role de quem enviou a msg

        if (!chamado) {
            return res.status(404).json({ message: "Chamado não encontrado ou acesso não permitido." });
        }
        res.status(200).json(chamado);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor ao buscar chamado." });
    }
};

/**
 * Adiciona uma nova resposta (mensagem) a um chamado existente.
 */
export const addResposta = async (req, res) => {
    try {
        const clienteId = req.user.id;
        const chamadoId = req.params.id;
        const { conteudo } = req.body;

        if (!conteudo) {
            return res.status(400).json({ message: "O conteúdo da resposta é obrigatório." });
        }

        const chamado = await Chamado.findOne({ _id: chamadoId, clienteId: clienteId });

        if (!chamado) {
            return res.status(404).json({ message: "Chamado não encontrado ou acesso não permitido." });
        }

        chamado.mensagens.push({ autor: clienteId, conteudo: conteudo });
        await chamado.save();

        res.status(200).json(chamado);

    } catch (error) {
        res.status(500).json({ message: "Erro no servidor ao adicionar resposta." });
    }
};