// backend/controllers/chamadoController.js (VERSÃO 100% COMPLETA E CORRIGIDA)

import Chamado from '../models/Chamado.js';
import Notificacao from '../models/Notificacao.js';

// --- Funções do Cliente ---
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
      participantes: [clienteId],
      mensagens: [{
        autor: clienteId,
        conteudo: conteudo,
      }],
    });

    await novoChamado.save();

    // Cria uma notificação para os admins sobre o novo chamado
    await new Notificacao({
        clienteId: clienteId,
        paraAdmin: true,
        mensagem: `Novo chamado aberto por ${req.user.nome}: "${assunto}"`,
        link: `/admin/chamados/${novoChamado._id}`
    }).save();

    res.status(201).json(novoChamado);

  } catch (error) {
    console.error("Erro ao abrir chamado:", error);
    res.status(500).json({ message: "Erro no servidor ao abrir chamado." });
  }
};

export const getChamados = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const chamados = await Chamado.find({ clienteId: clienteId })
      .select('-mensagens')
      .sort({ updatedAt: -1 });

    res.status(200).json(chamados);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao listar chamados." });
  }
};

export const getChamadoById = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const chamadoId = req.params.id;
    const chamado = await Chamado.findOne({ _id: chamadoId, clienteId: clienteId })
      .populate('mensagens.autor', 'nome role _id');
    if (!chamado) {
      return res.status(404).json({ message: "Chamado não encontrado ou acesso não permitido." });
    }
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao buscar chamado." });
  }
};

// --- Função de Resposta Unificada ---
export const addResposta = async (req, res) => {
    try {
        const autorId = req.user.id;
        const chamadoId = req.params.id;
        const { conteudo } = req.body;

        if (!conteudo) {
            return res.status(400).json({ message: "O conteúdo da resposta é obrigatório." });
        }
        
        const query = req.user.role === 'admin' 
            ? { _id: chamadoId } 
            : { _id: chamadoId, clienteId: autorId };
            
        const chamado = await Chamado.findOne(query);

        if (!chamado) {
            return res.status(404).json({ message: "Chamado não encontrado ou acesso não permitido." });
        }
        
        if (req.user.role === 'admin' && !chamado.participantes.includes(autorId)) {
            chamado.participantes.push(autorId);
        }

        if (req.user.role === 'admin' && chamado.status === 'Aberto') {
            chamado.status = 'Em Andamento';
        }

        chamado.mensagens.push({ autor: autorId, conteudo: conteudo });
        await chamado.save();
        
        if (req.user.role === 'admin') {
            await new Notificacao({
                clienteId: chamado.clienteId,
                mensagem: `Você recebeu uma nova resposta do suporte no chamado: "${chamado.assunto}"`,
                link: `/cliente/chamados/${chamado._id}`
            }).save();
        } else if (req.user.role === 'cliente') {
            await new Notificacao({
                clienteId: autorId,
                paraAdmin: true,
                mensagem: `Nova resposta de ${req.user.nome} em: "${chamado.assunto}"`,
                link: `/admin/chamados/${chamado._id}`
            }).save();
        }

        const chamadoAtualizado = await Chamado.findById(chamado._id).populate('mensagens.autor', 'nome role');
        res.status(200).json(chamadoAtualizado);

    } catch (error) {
        console.error("Erro ao adicionar resposta:", error);
        res.status(500).json({ message: "Erro no servidor ao adicionar resposta." });
    }
};

// --- Funções de Admin ---
export const getAllChamadosAdmin = async (req, res) => {
  try {
    const chamados = await Chamado.find({})
      .populate('clienteId', 'razaoSocial nome')
      .select('-mensagens')
      .sort({ status: 1, updatedAt: -1 });

    res.status(200).json(chamados);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar todos os chamados." });
  }
};

export const getChamadoByIdAdmin = async (req, res) => {
  try {
    const chamado = await Chamado.findById(req.params.id)
      .populate('mensagens.autor', 'nome role')
      .populate('clienteId', 'razaoSocial nome');
      
    if (!chamado) return res.status(404).json({ message: "Chamado não encontrado." });
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar chamado." });
  }
};

export const updateChamadoStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status é obrigatório." });

    const chamado = await Chamado.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!chamado) return res.status(404).json({ message: "Chamado não encontrado." });
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar status do chamado." });
  }
};