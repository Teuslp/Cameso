// backend/controllers/agendamentoController.js (VERSÃO CORRIGIDA E COMPLETA)

import Agendamento from '../models/Agendamento.js';
import Notificacao from '../models/Notificacao.js';

// --- Funções do Cliente ---
export const createAgendamento = async (req, res) => {
  try {
    const { colaboradorId, tipoExame, dataSugerida, observacoes } = req.body;
    const clienteId = req.user.id;

    if (!colaboradorId || !tipoExame || !dataSugerida) {
      return res.status(400).json({ message: "Colaborador, tipo de exame e data sugerida são obrigatórios." });
    }

    const novaSolicitacao = new Agendamento({
      clienteId,
      colaboradorId,
      tipoExame,
      dataSugerida,
      observacoes,
    });

    await novaSolicitacao.save();
    res.status(201).json(novaSolicitacao);

  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar criar agendamento." });
  }
};

export const getAgendamentos = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const agendamentos = await Agendamento.find({ clienteId: clienteId })
      .populate('colaboradorId', 'nomeCompleto')
      .sort({ createdAt: -1 });

    res.status(200).json(agendamentos);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar listar agendamentos." });
  }
};


// --- Funções do Administrador ---
export const getAllAgendamentosAdmin = async (req, res) => {
    try {
        const agendamentos = await Agendamento.find({})
            .populate('clienteId', 'razaoSocial nome')
            .populate('colaboradorId', 'nomeCompleto')
            .sort({ status: 1, dataSugerida: 1 });
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agendamentos." });
    }
};

export const updateAgendamentoAdmin = async (req, res) => {
    try {
        const { id: agendamentoId } = req.params;
        const { dataConfirmada, localConfirmado, instrucoes, status } = req.body;

        const agendamento = await Agendamento.findById(agendamentoId);
        if (!agendamento) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }

        agendamento.dataConfirmada = dataConfirmada || agendamento.dataConfirmada;
        agendamento.localConfirmado = localConfirmado || agendamento.localConfirmado;
        agendamento.instrucoes = instrucoes || agendamento.instrucoes;
        agendamento.status = status || agendamento.status;

        const agendamentoAtualizado = await agendamento.save();
        
        if (status === 'Confirmado') {
            await new Notificacao({
                clienteId: agendamento.clienteId,
                mensagem: `Seu agendamento para ${agendamento.tipoExame} foi confirmado para ${new Date(dataConfirmada).toLocaleDateString('pt-BR')}.`,
                link: `/cliente/agenda`
            }).save();
        }

        res.status(200).json(agendamentoAtualizado);

    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar agendamento." });
    }
};