// backend/controllers/chamadoController.js (VERSÃO ATUALIZADA)

import Chamado from '../models/Chamado.js';

// --- Funções do Cliente 
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
      .populate('mensagens.autor', 'nome role _id'); // Busca nome e role de quem enviou a msg

    if (!chamado) {
      return res.status(404).json({ message: "Chamado não encontrado ou acesso não permitido." });
    }
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao buscar chamado." });
  }
};

// --- FUNÇÃO DE RESPOSTA MODIFICADA ---
/**
 * Adiciona uma nova resposta (mensagem) a um chamado existente.
 * Agora funciona tanto para o cliente quanto para o admin.
 */
export const addResposta = async (req, res) => {
  try {
    const autorId = req.user.id; // ID de quem está respondendo (cliente ou admin)
    const chamadoId = req.params.id;
    const { conteudo } = req.body;

    if (!conteudo) {
      return res.status(400).json({ message: "O conteúdo da resposta é obrigatório." });
    }

    // Admin pode responder a qualquer chamado, cliente só pode responder ao seu.
    const query = req.user.role === 'admin'
      ? { _id: chamadoId }
      : { _id: chamadoId, clienteId: autorId };

    const chamado = await Chamado.findOne(query);

    if (!chamado) {
      return res.status(404).json({ message: "Chamado não encontrado ou acesso não permitido." });
    }

    // Adiciona o ID do admin aos participantes se for a primeira vez que ele responde
    if (req.user.role === 'admin' && !chamado.participantes.includes(autorId)) {
      chamado.participantes.push(autorId);
    }

    // Atualiza o status para "Em Andamento" se um admin responder um chamado "Aberto"
    if (req.user.role === 'admin' && chamado.status === 'Aberto') {
      chamado.status = 'Em Andamento';
    }

    chamado.mensagens.push({ autor: autorId, conteudo: conteudo });
    await chamado.save();

    // Popula os dados do autor para a resposta ser exibida corretamente no front-end
    const chamadoAtualizado = await Chamado.findById(chamado._id).populate('mensagens.autor', 'nome role');
    res.status(200).json(chamadoAtualizado);

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao adicionar resposta." });
  }
};


// --- NOVAS FUNÇÕES EXCLUSIVAS DO ADMIN ---

/**
 * [ADMIN] Lista todos os chamados de todos os clientes.
 */
export const getAllChamadosAdmin = async (req, res) => {
  try {
    const chamados = await Chamado.find({})
      .populate('clienteId', 'razaoSocial nome') // Busca o nome da empresa cliente
      .select('-mensagens') // Exclui as mensagens para a lista ficar mais leve
      .sort({ status: 1, updatedAt: -1 }); // Ordena por status e depois por mais recente

    res.status(200).json(chamados);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar todos os chamados." });
  }
};

/**
 * [ADMIN] Busca um chamado específico por ID, sem restrição de cliente.
 */
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

/**
 * [ADMIN] Altera o status de um chamado (ex: para 'Fechado').
 */
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