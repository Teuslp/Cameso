// backend/controllers/registroTreinamentoController.js (NOVO ARQUIVO)

import RegistroTreinamento from '../models/RegistroTreinamento.js';

/**
 * Cria um novo registro de treinamento para um colaborador.
 */
export const createRegistro = async (req, res) => {
  try {
    const { colaboradorId, treinamentoId, dataRealizacao, dataValidade } = req.body;
    const clienteId = req.user.id;

    const novoRegistro = new RegistroTreinamento({
      clienteId,
      colaboradorId,
      treinamentoId,
      dataRealizacao,
      dataValidade
    });

    await novoRegistro.save();
    res.status(201).json(novoRegistro);

  } catch (error) {
    console.error("Erro ao criar registro de treinamento:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

/**
 * Lista os registros de treinamento de um cliente.
 */
export const getRegistros = async (req, res) => {
  try {
    const clienteId = req.user.id;

    const registros = await RegistroTreinamento.find({ clienteId: clienteId })
      // Fazemos dois 'populates' para buscar os nomes do colaborador e do treinamento
      .populate('colaboradorId', 'nomeCompleto')
      .populate('treinamentoId', 'nome')
      .sort({ dataValidade: 1 }); // Ordena pelos próximos a vencer

    res.status(200).json(registros);
  } catch (error) {
    console.error("Erro ao listar registros de treinamento:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
};