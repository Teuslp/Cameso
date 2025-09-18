// backend/controllers/agendamentoController.js (NOVO ARQUIVO)

import Agendamento from '../models/Agendamento.js';

/**
 * Cria uma nova solicitação de agendamento.
 */
export const createAgendamento = async (req, res) => {
  try {
    const { colaboradorId, tipoExame, dataSugerida, observacoes } = req.body;
    const clienteId = req.user.id; // Vem do token de autenticação

    if (!colaboradorId || !tipoExame || !dataSugerida) {
      return res.status(400).json({ message: "Colaborador, tipo de exame e data sugerida são obrigatórios." });
    }

    const novaSolicitacao = new Agendamento({
      clienteId,
      colaboradorId,
      tipoExame,
      dataSugerida,
      observacoes,
      // O status será 'Solicitado' por padrão, como definido no Model.
    });

    await novaSolicitacao.save();
    res.status(201).json(novaSolicitacao);

  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar criar agendamento." });
  }
};

/**
 * Lista todos os agendamentos de um cliente.
 */
export const getAgendamentos = async (req, res) => {
  try {
    const clienteId = req.user.id;

    const agendamentos = await Agendamento.find({ clienteId: clienteId })
      .populate('colaboradorId', 'nomeCompleto') // Busca o nome do colaborador
      .sort({ createdAt: -1 }); // Ordena pelas solicitações mais recentes primeiro

    res.status(200).json(agendamentos);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar listar agendamentos." });
  }
};